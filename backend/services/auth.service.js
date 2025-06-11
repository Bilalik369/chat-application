const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/env');

class AuthService {
  generateToken(userId) {
    return jwt.sign({ userId }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE
    });
  }

  async register({ username, email, password }) {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = this.generateToken(user._id);

    return {
      user: user.toJSON(),
      token
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    // Update user online status
    user.isOnline = true;
    await user.save();

    const token = this.generateToken(user._id);

    return {
      user: user.toJSON(),
      token
    };
  }

  async logout(userId) {
    await User.findByIdAndUpdate(userId, {
      isOnline: false,
      lastSeen: new Date()
    });
  }
}

module.exports = new AuthService();