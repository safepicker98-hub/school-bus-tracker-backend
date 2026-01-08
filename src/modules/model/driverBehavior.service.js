const driverBehaviorModel = require('./driverBehavior.model');

class DriverBehaviorService {
  async logBehavior({ driverId, tripId, speed, braking, eventType }) {
    return driverBehaviorModel.log({ driverId, tripId, speed, braking, eventType });
  }

  async getDriverScore(driverId) {
    return driverBehaviorModel.getDriverScore(driverId);
  }

  async getDriverReports(driverId) {
    return driverBehaviorModel.getDriverReports(driverId);
  }
}

module.exports = new DriverBehaviorService();
