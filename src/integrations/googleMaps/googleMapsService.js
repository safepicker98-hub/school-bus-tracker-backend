const { createClient } = require('@google/maps');
const logger = require('../../config/logger');

// Ensure you have GOOGLE_MAPS_API_KEY in your .env
const client = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise,
});

/**
 * Get distance matrix between origins and destinations.
 * @param {Array<string>} origins - e.g. ['lat,lng']
 * @param {Array<string>} destinations - e.g. ['lat,lng']
 * @param {object} [options] - additional options for the API
 * @returns {Promise<object>} - raw response from Google Maps API
 */
async function getDistanceMatrix(origins, destinations, options = {}) {
  try {
    const response = await client.distanceMatrix({
      origins,
      destinations,
      mode: options.mode || 'driving',
      departure_time: options.departure_time || 'now',
      traffic_model: options.traffic_model || 'best_guess',
      ...options,
    }).asPromise();
    logger.info('Google Maps distance matrix fetched', {
      origins,
      destinations,
      status: response.json.status,
    });
    return response.json;
  } catch (err) {
    logger.error('Google Maps API error', { err });
    throw err;
  }
}

module.exports = { getDistanceMatrix };
