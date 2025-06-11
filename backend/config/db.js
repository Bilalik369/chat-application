const mongoose = require('mongoose');
const config = require('./env');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const mongoUri = config.NODE_ENV === 'test' ? config.MONGODB_URI_TEST : config.MONGODB_URI;
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;