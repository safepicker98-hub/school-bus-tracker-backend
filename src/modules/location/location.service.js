const locationModel = require('./location.model');

class LocationService {

  async updateLocation(busId, payload) {
    return locationModel.create({
      busId,
      latitude: payload.latitude,
      longitude: payload.longitude,
      speed: payload.speed,
      heading: payload.heading
    });
  }

  async getLatestLocation(busId) {
    const location = await locationModel.findLatestByBus(busId);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  }
}

module.exports = new LocationService();
