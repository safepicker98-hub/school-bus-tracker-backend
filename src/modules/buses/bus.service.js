const busModel = require('./bus.model');

class BusService {

  async createBus(payload) {
    if (!payload.busNumber) {
      throw new Error('Bus number is required');
    }
    return busModel.create(payload);
  }

  async listBuses() {
    return busModel.findAll();
  }

  async getBusById(id) {
    const bus = await busModel.findById(id);
    if (!bus) {
      throw new Error('Bus not found');
    }
    return bus;
  }

  async updateBus(id, payload) {
    await this.getBusById(id);
    return busModel.update(id, payload);
  }

  async deleteBus(id) {
    await this.getBusById(id);
    return busModel.delete(id);
  }

  async assignDriver({ busId, driverId }) {
    if (!busId || !driverId) {
      throw new Error('Bus ID and Driver ID are required');
    }

    return busModel.assignDriver(busId, driverId);
  }
}

module.exports = new BusService();
