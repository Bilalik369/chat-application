const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    length: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxMembers: {
    type: Number,
    default: 10
  },
  isPrivate: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

roomSchema.index({ code: 1 });
roomSchema.index({ creator: 1 });

module.exports = mongoose.model('Room', roomSchema);