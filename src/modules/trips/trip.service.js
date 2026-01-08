const tripModel = require('./trip.model');

class TripService {

  async startTrip(driverId, payload) {
    return tripModel.create({
      ...payload,
      driverId,
      status: 'ACTIVE',
      startedAt: new Date()
    });
  }

  async endTrip(driverId, tripId) {
    const trip = await tripModel.findById(tripId);

    if (!trip) {
      throw new Error('Trip not found');
    }

    if (trip.driverId !== driverId) {
      throw new Error('Unauthorized');
    }

    return tripModel.update(tripId, {
      status: 'COMPLETED',
      endedAt: new Date()
    });
  }

  async activeTrips() {
    return tripModel.findActive();
  }

  async tripDetails(id) {
    const trip = await tripModel.findById(id);
    if (!trip) {
      throw new Error('Trip not found');
    }
    return trip;
  }

  async tripHistory() {
    return tripModel.findHistory();
  }

  async parentTrips(parentId) {
    return tripModel.findByParent(parentId);
  }
}

module.exports = new TripService();
