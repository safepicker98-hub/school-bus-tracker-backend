const bcrypt = require('bcryptjs');
const driverModel = require('./driver.model');

class DriverService {

  async createDriver(payload) {
    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required');
    }

    payload.password = await bcrypt.hash(payload.password, 10);
    return driverModel.create(payload);
  }

  async listDrivers() {
    return driverModel.findAll();
  }

  async getDriverById(id) {
    const driver = await driverModel.findById(id);
    if (!driver || driver.role !== 'driver') {
      throw new Error('Driver not found');
    }

    delete driver.password;
    return driver;
  }

  async updateDriver(id, payload) {
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const driver = await this.getDriverById(id);
    return driverModel.update(driver.id, payload);
  }

  async getMyProfile(driverId) {
    const driver = await this.getDriverById(driverId);
    return driver;
  }
}

module.exports = new DriverService();
