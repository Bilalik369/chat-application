const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const Room = require('../../models/room.model');
const messageService = require('../../services/message.service');
const roomService = require('../../services/room.service');
const config = require('../../config/env');
const { SOCKET_EVENTS, ERROR_MESSAGES } = require('../../utils/constants');
const logger = require('../../utils/logger');

class ChatHandler {
  constructor(io) {
    this.io = io;
    this.userSockets = new Map(); // userId -> socketId
  }

  async handleConnection(socket) {
    logger.info(`Socket connected: ${socket.id}`);

    // Authenticate socket connection
    const token = socket.handshake.auth.token;
    if (!token) {
      socket.emit(SOCKET_EVENTS.ERROR, { message: ERROR_MESSAGES.UNAUTHORIZED });
      socket.disconnect();
      return;
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        socket.emit(SOCKET_EVENTS.ERROR, { message: ERROR_MESSAGES.USER_NOT_FOUND });
        socket.disconnect();
        return;
      }

      socket.userId = user._id.toString();
      socket.user = user;
      this.userSockets.set(socket.userId, socket.id);

      // Update user online status
      await User.findByIdAndUpdate(user._id, { isOnline: true });

      logger.info(`User ${user.username} connected`);

      // Set up event handlers
      this.setupEventHandlers(socket);

    } catch (error) {
      logger.error(`Socket authentication error: ${error.message}`);
      socket.emit(SOCKET_EVENTS.ERROR, { message: ERROR_MESSAGES.UNAUTHORIZED });
      socket.disconnect();
    }
  }

  setupEventHandlers(socket) {
    socket.on(SOCKET_EVENTS.JOIN_ROOM, (data) => this.handleJoinRoom(socket, data));
    socket.on(SOCKET_EVENTS.LEAVE_ROOM, (data) => this.handleLeaveRoom(socket, data));
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (data) => this.handleSendMessage(socket, data));
    socket.on(SOCKET_EVENTS.DISCONNECT, () => this.handleDisconnect(socket));
  }

  async handleJoinRoom(socket, { roomCode }) {
    try {
      const room = await roomService.getRoomByCode(roomCode);
      
      if (!room) {
        socket.emit(SOCKET_EVENTS.ERROR, { message: ERROR_MESSAGES.ROOM_NOT_FOUND });
        return;
      }

      // Check if user is member of the room
      const isMember = room.members.some(member => member._id.toString() === socket.userId);
      if (!isMember) {
        await roomService.joinRoom(roomCode, socket.userId);
      }

      // Join socket room
      socket.join(room._id.toString());
      socket.currentRoom = room._id.toString();

      // Get room messages
      const messages = await messageService.getRoomMessages(room._id.toString());

      // Send room data to user
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, {
        room: room,
        messages: messages
      });

      // Notify other users in the room
      socket.to(room._id.toString()).emit(SOCKET_EVENTS.USER_JOINED, {
        user: socket.user,
        roomId: room._id
      });

    } catch (error) {
      logger.error(`Join room error: ${error.message}`);
      socket.emit(SOCKET_EVENTS.ERROR, { message: error.message });
    }
  }

  async handleLeaveRoom(socket, { roomId }) {
    try {
      await roomService.leaveRoom(roomId, socket.userId);
      socket.leave(roomId);
      socket.currentRoom = null;

      // Notify other users in the room
      socket.to(roomId).emit(SOCKET_EVENTS.USER_LEFT, {
        userId: socket.userId,
        roomId: roomId
      });

      socket.emit(SOCKET_EVENTS.LEAVE_ROOM, { success: true });
    } catch (error) {
      logger.error(`Leave room error: ${error.message}`);
      socket.emit(SOCKET_EVENTS.ERROR, { message: error.message });
    }
  }

  async handleSendMessage(socket, { content, roomId }) {
    try {
      const message = await messageService.saveMessage({
        content,
        sender: socket.userId,
        room: roomId
      });

      // Broadcast message to room
      this.io.to(roomId).emit(SOCKET_EVENTS.NEW_MESSAGE, message);
    } catch (error) {
      logger.error(`Send message error: ${error.message}`);
      socket.emit(SOCKET_EVENTS.ERROR, { message: error.message });
    }
  }

  async handleDisconnect(socket) {
    try {
      if (socket.userId) {
        this.userSockets.delete(socket.userId);
        
        // Update user online status
        await User.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date()
        });

        logger.info(`User ${socket.userId} disconnected`);
      }
    } catch (error) {
      logger.error(`Disconnect error: ${error.message}`);
    }
  }
}

module.exports = ChatHandler;