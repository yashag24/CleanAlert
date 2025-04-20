const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

module.exports = {
  predictImage: async (imageBuffer) => {
    try {
      const form = new FormData();
      form.append('file', imageBuffer, { filename: 'image.jpg' });

      // Send the image file as multipart/form-data
      const response = await axios.post(
        `${process.env.PYTHON_API_URL}/predict`,
        form,
        {
          headers: {
            ...form.getHeaders(), // This is important to set the correct content type
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Python API error: ${error.message}`);
    }
  }
};
