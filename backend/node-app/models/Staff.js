const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  role: {
    type: String,
    enum: ['supervisor', 'collector', 'admin'],
    default: 'collector'
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Invalid phone number format']
  },
  currentAssignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detection'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Staff', staffSchema);//1