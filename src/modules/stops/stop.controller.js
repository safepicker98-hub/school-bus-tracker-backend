const stopService = require('./stop.service');

class StopController {

  async addStop(req, res) {
    try {
      const stop = await stopService.addStopToRoute(
        req.params.id,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: 'Stop added successfully',
        stop
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const stop = await stopService.updateStop(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: 'Stop updated successfully',
        stop
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
      await stopService.deleteStop(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Stop deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async assignStudent(req, res) {
    try {
      const result = await stopService.assignStudent(req.body);
      return res.status(200).json({
        success: true,
        message: 'Student assigned to stop',
        result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new StopController();
