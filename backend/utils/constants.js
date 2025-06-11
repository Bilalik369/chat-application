module.exports = {
  SOCKET_EVENTS: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',
    SEND_MESSAGE: 'send_message',
    NEW_MESSAGE: 'new_message',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left',
    ROOM_USERS: 'room_users',
    ERROR: 'error'
  },
  
  REDIS_KEYS: {
    ROOM_MESSAGES: 'room_messages:',
    ROOM_USERS: 'room_users:',
    USER_ROOMS: 'user_rooms:'
  },
  
  ERROR_MESSAGES: {
    UNAUTHORIZED: 'Unauthorized access',
    ROOM_NOT_FOUND: 'Room not found',
    INVALID_ROOM_CODE: 'Invalid room code',
    USER_NOT_FOUND: 'User not found',
    VALIDATION_ERROR: 'Validation error'
  }
};