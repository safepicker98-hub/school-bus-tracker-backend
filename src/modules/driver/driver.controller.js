const driverService = require('./driver.service');

class DriverController {

  async create(req, res) {
    try {
      const driver = await driverService.createDriver(req.body);
      return res.status(201).json({
        success: true,
        message: 'Driver created successfully',
        driver
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async list(req, res) {
    try {
      const drivers = await driverService.listDrivers();
      return res.status(200).json({
        success: true,
        drivers
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const driver = await driverService.getDriverById(req.params.id);
      return res.status(200).json({
        success: true,
        driver
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const driver = await driverService.updateDriver(
        req.params.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: 'Driver updated successfully',
        driver
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async me(req, res) {
    try {
      const driver = await driverService.getMyProfile(req.user.userId);
      return res.status(200).json({
        success: true,
        driver
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new DriverController();
