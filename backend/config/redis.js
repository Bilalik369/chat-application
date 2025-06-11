const redis = require('redis');
const config = require('./env');
const logger = require('../utils/logger');

const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
  retry_strategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (err) => {
  logger.error(`Redis connection error: ${err.message}`);
});

module.exports = redisClient;