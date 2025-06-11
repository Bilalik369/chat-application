const Room = require('../models/room.model');
const generateRoomCode = require('../utils/generateRoomCode');

class RoomService {
  async createRoom({ name, description, maxMembers, creator }) {
    let code;
    let roomExists = true;

    // Generate unique room code
    while (roomExists) {
      code = generateRoomCode();
      roomExists = await Room.findOne({ code });
    }

    const room = new Room({
      code,
      name,
      description,
      maxMembers,
      creator,
      members: [creator]
    });

    await room.save();
    await room.populate('creator', 'username email avatar');

    return room;
  }

  async joinRoom(code, userId) {
    const room = await Room.findOne({ code, isActive: true });

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.members.length >= room.maxMembers) {
      throw new Error('Room is full');
    }

    if (!room.members.includes(userId)) {
      room.members.push(userId);
      await room.save();
    }

    await room.populate('members', 'username email avatar isOnline');

    return room;
  }

  async leaveRoom(roomId, userId) {
    const room = await Room.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    room.members = room.members.filter(member => !member.equals(userId));

    if (room.members.length === 0) {
      room.isActive = false;
    }

    await room.save();
    return room;
  }

  async getRoomByCode(code) {
    const room = await Room.findOne({ code, isActive: true })
      .populate('creator', 'username email avatar')
      .populate('members', 'username email avatar isOnline');

    return room;
  }

  async getUserRooms(userId) {
    const rooms = await Room.find({
      members: userId,
      isActive: true
    })
    .populate('creator', 'username email avatar')
    .populate('members', 'username email avatar isOnline')
    .sort({ updatedAt: -1 });

    return rooms;
  }
}

module.exports = new RoomService();