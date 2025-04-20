const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  prediction: { type: String, required: true },
  confidence: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  location_name: { type: String, required: true },
  image_url: { type: String, required: true },  // ✅ NOT imageUrl
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now },
  source: { type: String, default: 'user_upload' }
});

module.exports = mongoose.model('Detection', detectionSchema);
