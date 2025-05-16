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

// Services
const { autoFetchAndProcess } = require('./services/gridfsService'); // Adjust path if needed

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Start GridFS processing when MongoDB is ready
mongoose.connection.once('open', () => {
  console.log('MongoDB connected, starting GridFS auto-fetch process...');
  autoFetchAndProcess();
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Routes

app.post('/upload', upload.single('image'), detectionController.uploadImage);

app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/', detectionRoutes);

// Serve static uploads
app.use('/uploads', express.static('uploads'));

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// WebSocket setup
const io = socketio(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
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

// Fallback + Error Handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
