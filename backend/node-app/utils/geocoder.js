const axios = require('axios');

module.exports.getLocationName = (lat, lon) => {
  return new Promise((resolve, reject) => {
    // Log the coordinates to debug
    console.log(`Received coordinates: lat=${lat}, lon=${lon}`);

    // Validate latitude and longitude
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      console.error('Invalid latitude or longitude');
      return reject(new Error('Invalid latitude or longitude'));
    }

    axios
      .get('https://nominatim.openstreetmap.org/reverse', {
        params: { lat, lon, format: 'json' },
        headers: { 'User-Agent': 'YourApp/1.0' },
      })
      .then((response) => {
        // Check if the response contains address data
        if (!response.data || !response.data.address) {
          console.error('No address found for the given coordinates');
          return reject(new Error('No address found for the given coordinates'));
        }

        const address = response.data.address;
        const locationName =
          [
            address.road,
            address.city,
            address.state,
            address.country,
          ]
            .filter(Boolean)
            .join(', ') || 'Unknown Location';

        resolve(locationName);
      })
      .catch((error) => {
        // Log the error message to help with debugging
        console.error('Geocoding failed:', error.message);
        reject(new Error('Geocoding failed'));
      });
  });
};
