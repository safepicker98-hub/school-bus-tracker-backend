const { Client } = require("@googlemaps/google-maps-services-js");
const logger = require("../../config/logger");

// Create client (NO API KEY HERE)
const client = new Client({});

/**
 * Get distance matrix between origins and destinations
 */
async function getDistanceMatrix(origins, destinations, options = {}) {
  try {
    const response = await client.distancematrix({
      params: {
        origins,
        destinations,
        mode: options.mode || "driving",
        departure_time: options.departure_time || "now",
        traffic_model: options.traffic_model || "best_guess",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    logger.info("Google Maps distance matrix fetched", {
      origins,
      destinations,
      status: response.data.status,
    });

    return response.data;
  } catch (err) {
    logger.error("Google Maps API error", err);
    throw err;
  }
}

module.exports = { getDistanceMatrix };
