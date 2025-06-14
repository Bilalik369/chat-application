const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/env');
const { ERROR_MESSAGES } = require('../utils/constants');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED
    });
  }
};

module.exports = authMiddleware;