const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies, Authorization header, or query string
    const token = req.cookies?.token || 
                 req.headers?.authorization?.split(' ')[1] || 
                 req.query?.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication token required' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Session expired. Please login again' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid authentication token' 
      });
    }

    return res.status(500).json({ 
      success: false,
      error: 'Authentication failed' 
    });
  }
};

module.exports = authMiddleware;