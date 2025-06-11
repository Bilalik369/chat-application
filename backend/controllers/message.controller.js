const messageService = require('../services/message.service');

class MessageController {
  async getRoomMessages(req, res, next) {
    try {
      const { roomId } = req.params;
      const { page = 1, limit = 50 } = req.query;

      const messages = await messageService.getRoomMessages(
        roomId,
        parseInt(page),
        parseInt(limit)
      );

      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();