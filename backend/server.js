const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Custom request logger middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
};

// Route imports
const newsletterRoutes = require('./routes/newsletterRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.set('trust proxy', 1); // trust first proxy (e.g., Railway)

// Security & Performance Middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://car-service-silk-nu.vercel.app',
  'https://car-service-git-main-rajkumar-yogis-projects.vercel.app',
  'https://car-service-fouw3jqw6-rajkumar-yogis-projects.vercel.app'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Database
connectDB();

// Routes
app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cart', cartRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));