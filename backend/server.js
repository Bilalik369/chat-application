const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const config = require('./config/env');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./utils/logger');
const ChatHandler = require('./sockets/handlers/chat.handler');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Connect to database
connectDB();

// Initialize Redis
redisClient.on('error', (err) => {
  logger.error(`Redis error: ${err.message}`);
});

// Middlewares
app.use(helmet());
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

// Initialize Socket.io
const io = socketio(server, {
  cors: {
    origin: config.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Socket.io chat handler
const chatHandler = new ChatHandler(io);
io.on('connection', (socket) => chatHandler.handleConnection(socket));

// Start server
server.listen(config.PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = server;




