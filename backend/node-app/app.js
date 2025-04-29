
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');

// Controllers
const authController = require('./controllers/authController');
const detectionController = require('./controllers/detectionController');

// Routes
const authRoutes = require('./routes/authRoutes');
const detectionRoutes = require('./routes/detectionRoutes');
const staffRoutes = require('./routes/staffRoutes');

// Middlewares
const auth = require('./middlewares/auth');
const adminCheck = require('./middlewares/adminCheck');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/gi, '');
    cb(null, `${timestamp}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Legacy endpoints
app.post('/api/login', authController.login);
app.post('/upload', upload.single('image'), detectionController.uploadImage);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/staff', auth, adminCheck, staffRoutes);
app.use('/api/', detectionRoutes);

// Static files
app.use('/uploads', express.static('uploads'));

// WebSocket setup
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('status', 'Connected to WebSocket server');

  socket.on('sendNotification', (data) => {
    console.log('Sending notification:', data);
    io.emit('notification', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Error handling
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
