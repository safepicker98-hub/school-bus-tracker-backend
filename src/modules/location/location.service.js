const locationModel = require('./location.model');
const logger = require('../../config/logger');

class LocationService {

  async updateLocation(busId, payload) {
    try {
      logger.info('Updating location for bus %s', busId, { payload });
      const loc = await locationModel.create({
        busId,
        latitude: payload.latitude,
        longitude: payload.longitude,
        speed: payload.speed,
        heading: payload.heading,
      });
      return loc;
    } catch (err) {
      logger.error('Failed to update location', { err, busId });
      throw err;
    }
  }

  async getLatestLocation(busId) {
    try {
      const location = await locationModel.findLatestByBus(busId);
      if (!location) {
        throw new Error('Location not found');
      }
      return location;
    } catch (err) {
      logger.error('Failed to get latest location', { err, busId });
      throw err;
    }
  }
}

module.exports = new LocationService();
