const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware (single default export)
module.exports = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ 
      error: 'Authentication required',
      details: error.message
    });
  }
};