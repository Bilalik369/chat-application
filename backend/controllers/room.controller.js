const roomService = require('../services/room.service');

class RoomController {
  async createRoom(req, res, next) {
    try {
      const room = await roomService.createRoom({
        ...req.body,
        creator: req.user._id
      });

      res.status(201).json({
        success: true,
        message: 'Room created successfully',
        data: room
      });
    } catch (error) {
      next(error);
    }
  }

  async joinRoom(req, res, next) {
    try {
      const { code } = req.body;
      const room = await roomService.joinRoom(code, req.user._id);

      res.json({
        success: true,
        message: 'Joined room successfully',
        data: room
      });
    } catch (error) {
      next(error);
    }
  }

  async leaveRoom(req, res, next) {
    try {
      const { roomId } = req.params;
      const room = await roomService.leaveRoom(roomId, req.user._id);

      res.json({
        success: true,
        message: 'Left room successfully',
        data: room
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserRooms(req, res, next) {
    try {
      const rooms = await roomService.getUserRooms(req.user._id);

      res.json({
        success: true,
        data: rooms
      });
    } catch (error) {
      next(error);
    }
  }

  async getRoomByCode(req, res, next) {
    try {
      const { code } = req.params;
      const room = await roomService.getRoomByCode(code);

      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      res.json({
        success: true,
        data: room
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoomController();