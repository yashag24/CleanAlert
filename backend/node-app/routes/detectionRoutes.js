const express = require('express');
const router = express.Router();
const detectionController = require('../controllers/detectionController');
const multer = require('multer');

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.patch('/detections/:id/status', detectionController.updateStatus);
router.get('/detections', detectionController.getDetections);
router.post('/upload', upload.single('image'), detectionController.uploadImage);
router.delete('/detections/:id', detectionController.deleteDetection);

module.exports = router;
