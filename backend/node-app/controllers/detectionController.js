const Detection = require('../models/Detection');
const { predictImage } = require('../services/pythonAPI');
const { sendEmail } = require('../services/emailService');
const fs = require('fs').promises;
const { getLocationName } = require('../utils/geocoder');
const mongoose = require('mongoose');


exports.uploadImage = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    console.log(`latitude: ${latitude}, longitude: ${longitude}`);

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageBuffer = await fs.readFile(req.file.path);

    const prediction = await predictImage(imageBuffer);

    const location_name = await getLocationName(latitude, longitude).catch((error) => {
      console.error('Geocoding failed:', error.message);
      return 'Unknown Location';
    });

    const image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const detection = new Detection({
      prediction: prediction.class_name,
      confidence: prediction.confidence,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      location_name,
      image_url,
      status: 'pending',
      timestamp: new Date().toISOString(),
      source: 'user_upload'
    });

    await detection.save();

    const responseData = {
      _id: detection._id,
      prediction: detection.prediction,
      confidence: detection.confidence,
      latitude: detection.latitude,
      longitude: detection.longitude,
      location_name: detection.location_name,
      image_url: detection.image_url,
      timestamp: detection.timestamp,
      status: detection.status,
      source: detection.source
    };

    if (prediction.class_name === 'Garbage') {
      sendEmail(
        '🗑️ Garbage Detection Alert 🚨',
        `📍 *Location:* ${location_name}
    🌍 Coordinates: (${latitude}, ${longitude})
    📸 Image URL: http://localhost:5000${responseData.image_url}
    
    ✅ *Prediction:* Garbage
    📊 *Confidence:* ${(prediction.confidence * 100).toFixed(2)}%
    
    🕒 *Detected At:* ${new Date().toLocaleString()}
    
    Please schedule a cleanup as soon as possible to maintain hygiene and cleanliness in the area. 🧹✨`
      );
      req.app.get('socketio').emit('new_detection', responseData);
    }
    
    res.status(201).json(responseData);

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      error: 'Image processing failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all detections
exports.getDetections = async (req, res) => {
  try {
    const detections = await Detection.find().sort({ timestamp: -1 });
    res.json(detections);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch detections',
      details: error.message
    });
  }
};

// Delete a detection
exports.deleteDetection = async (req, res) => {
  try {
    const detection = await Detection.findByIdAndDelete(req.params.id);
    if (!detection) {
      return res.status(404).json({ error: 'Detection not found' });
    }
    req.app.get('socketio').emit('delete_detection', req.params.id);
    res.json({ message: 'Detection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update detection status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`🟡 Received ID: '${id}'`);
    console.log(`🟡 Requested status: '${status}'`);

    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Validate and convert ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid detection ID format' });
    }

    const updated = await Detection.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { status },
      { new: true }
    );

    if (!updated) {
      console.error('❌ Detection not found for ID:', id);
      return res.status(404).json({ error: 'Detection not found' });
    }

    const updatedDetection = {
      _id: updated._id.toString(),
      prediction: updated.prediction,
      confidence: updated.confidence,
      latitude: updated.latitude,
      longitude: updated.longitude,
      location_name: updated.location_name,
      image_url: updated.image_url || updated.imageUrl, // in case you're using snake_case or camelCase
      timestamp: updated.timestamp,
      status: updated.status,
      source: updated.source,
    };

    // WebSocket notification
    const io = req.app.get('socketio');
    io.emit('status_update', updatedDetection);

    return res.status(200).json(updatedDetection);
  } catch (error) {
    console.error('❌ Failed to update status:', error);
    return res.status(500).json({ error: 'Failed to update status' });
  }
};