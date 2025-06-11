const express = require('express');
const authRoutes = require('./auth.routes');
const roomRoutes = require('./room.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;