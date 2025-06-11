const express = require('express');
const roomController = require('../controllers/room.controller');
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validate, schemas } = require('../middlewares/validate.middleware');

const router = express.Router();

// Room routes
router.post('/create', authMiddleware, validate(schemas.createRoom), roomController.createRoom);
router.post('/join', authMiddleware, validate(schemas.joinRoom), roomController.joinRoom);
router.delete('/:roomId/leave', authMiddleware, roomController.leaveRoom);
router.get('/my-rooms', authMiddleware, roomController.getUserRooms);
router.get('/:code', authMiddleware, roomController.getRoomByCode);

// Message routes
router.get('/:roomId/messages', authMiddleware, messageController.getRoomMessages);

module.exports = router;