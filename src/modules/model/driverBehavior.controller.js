const driverBehaviorService = require('./driverBehavior.service');

class DriverBehaviorController {
  async log(req, res) {
    try {
      const driverId = req.user.userId;
      const { tripId, speed, braking, eventType } = req.body;
      const log = await driverBehaviorService.logBehavior({ driverId, tripId, speed, braking, eventType });
      res.status(201).json({ success: true, log });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getScore(req, res) {
    try {
      const { id } = req.params;
      const score = await driverBehaviorService.getDriverScore(Number(id));
      res.status(200).json({ success: true, score });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getReports(req, res) {
    try {
      const { id } = req.params;
      const reports = await driverBehaviorService.getDriverReports(Number(id));
      res.status(200).json({ success: true, reports });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new DriverBehaviorController();
