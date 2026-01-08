const busService = require('./bus.service');

class BusController {

  async create(req, res) {
    try {
      const bus = await busService.createBus(req.body);
      return res.status(201).json({
        success: true,
        message: 'Bus created successfully',
        bus
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
      const buses = await busService.listBuses();
      return res.status(200).json({
        success: true,
        buses
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
      const bus = await busService.getBusById(req.params.id);
      return res.status(200).json({
        success: true,
        bus
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
      const bus = await busService.updateBus(
        req.params.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: 'Bus updated successfully',
        bus
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      await busService.deleteBus(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Bus deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async assignDriver(req, res) {
    try {
      const bus = await busService.assignDriver(req.body);
      return res.status(200).json({
        success: true,
        message: 'Driver assigned successfully',
        bus
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new BusController();
