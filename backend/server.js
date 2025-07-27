const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');


// Custom request logger middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms - ${res.get('Content-Length') || 0}b`
    );
  });

  next();
};
const newsletterRoutes = require('./routes/newsletterRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const cartRoutes = require('./routes/cartRoutes');
const setupSocket = require('./utils/socket');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173','https://bajdoliya-workshop.vercel.app/','bajdoliya-workshop-8dbiv2bdn-rajkumar-yogis-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// Database Connection
connectDB();

// Socket.io
setupSocket(io);


// Basic health check route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));