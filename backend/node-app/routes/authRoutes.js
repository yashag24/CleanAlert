const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// New endpoint: /api/auth/login
// Legacy endpoint: /api/login (handled by app.js)
router.post('/login', authController.login); 
router.post('/register', authController.register);

module.exports = router;