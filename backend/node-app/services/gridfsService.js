const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { uploadImage } = require('../controllers/detectionController');
const fs = require('fs');
const path = require('path');

let gfs;
const conn = mongoose.connection;
console.log("started fetching from grid");

// Initialize GridFS connection
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
  setInterval(autoFetchAndProcess, 30000); // Run every 30 seconds
});

async function autoFetchAndProcess() {
  try {
    const thirtySecondsAgo = new Date(Date.now() - 30000);

    // Find images from last 30 seconds that are not processed
    const files = await gfs.files.find({
      uploadDate: { $gte: thirtySecondsAgo },
      'metadata.processed': { $ne: true }
    }).toArray();

    if (files.length === 0) {
      console.log('No images');
      return;
    }

    console.log(`Found ${files.length} unprocessed image(s)`);

    // Ensure /tmp directory exists
    const tmpDir = '/tmp';
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    for (const file of files) {
      console.log(`Processing file: ${file.filename}`);

      const tempPath = path.join(tmpDir, file.filename);

      // Download image from GridFS to /tmp
      await new Promise((resolve, reject) => {
        const readStream = gfs.createReadStream({ _id: file._id });
        const writeStream = fs.createWriteStream(tempPath);
        readStream.pipe(writeStream)
          .on('finish', () => {
            console.log(`Downloaded ${file.filename} to temp path`);
            resolve();
          })
          .on('error', reject);
      });

      // Create mock request with required properties for your uploadImage controller
      const mockReq = {
        file: {
          path: tempPath,
          filename: file.filename,
          originalname: file.filename
        },
        body: {
          latitude: file.metadata?.latitude || 0,
          longitude: file.metadata?.longitude || 0
        },
        user: file.metadata?.user || { id: 'system' },
        app: {
          get: (name) => {
            if (name === 'socketio') {
              return {
                emit: (event, data) => console.log(`Socket emitted event "${event}"`, data)
              };
            }
            return null;
          }
        }
      };

      const mockRes = {
        status: (code) => ({
          json: (data) => console.log('Processed:', data)
        })
      };

      // Call your existing uploadImage controller with mock req/res
      await uploadImage(mockReq, mockRes);

      // Mark file as processed in GridFS
      await gfs.files.updateOne(
        { _id: file._id },
        { $set: { 'metadata.processed': true } }
      );

      // Delete temp file (cleanup)
      try {
        fs.unlinkSync(tempPath);
        console.log(`Cleaned up temp file: ${tempPath}`);
      } catch (err) {
        console.error(`Failed to delete temp file ${tempPath}:`, err);
      }
    }
  } catch (error) {
    console.error('Auto-process error:', error);
  }
}

module.exports = { autoFetchAndProcess };
