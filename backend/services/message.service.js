const Message = require('../models/message.model');
const redisClient = require('../config/redis');
const { REDIS_KEYS } = require('../utils/constants');

class MessageService {
  async saveMessage({ content, sender, room, messageType = 'text' }) {
    const message = new Message({
      content,
      sender,
      room,
      messageType
    });

    await message.save();
    await message.populate('sender', 'username avatar');

    // Cache recent messages in Redis
    await this.cacheMessage(room, message);

    return message;
  }

  async getRoomMessages(roomId, page = 1, limit = 50) {
    // Try to get from cache first
    const cachedMessages = await this.getCachedMessages(roomId);
    
    if (cachedMessages && cachedMessages.length > 0) {
      return cachedMessages.slice(0, limit);
    }

    // Fallback to database
    const messages = await Message.find({ room: roomId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * page)
      .skip((page - 1) * limit);

    // Cache the results
    if (messages.length > 0) {
      await this.cacheMessages(roomId, messages);
    }

    return messages.reverse();
  }

  async cacheMessage(roomId, message) {
    try {
      const key = `${REDIS_KEYS.ROOM_MESSAGES}${roomId}`;
      await redisClient.lpush(key, JSON.stringify(message));
      await redisClient.ltrim(key, 0, 99); // Keep only last 100 messages
      await redisClient.expire(key, 3600); // Expire in 1 hour
    } catch (error) {
      console.error('Redis cache error:', error);
    }
  }

  async getCachedMessages(roomId) {
    try {
      const key = `${REDIS_KEYS.ROOM_MESSAGES}${roomId}`;
      const messages = await redisClient.lrange(key, 0, -1);
      return messages.map(msg => JSON.parse(msg)).reverse();
    } catch (error) {
      console.error('Redis get error:', error);
      return [];
    }
  }

  async cacheMessages(roomId, messages) {
    try {
      const key = `${REDIS_KEYS.ROOM_MESSAGES}${roomId}`;
      const pipeline = redisClient.pipeline();
      
      messages.forEach(message => {
        pipeline.lpush(key, JSON.stringify(message));
      });
      
      pipeline.expire(key, 3600);
      await pipeline.exec();
    } catch (error) {
      console.error('Redis cache messages error:', error);
    }
  }
}

module.exports = new MessageService();