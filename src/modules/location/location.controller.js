const locationService = require('./location.service');

class LocationController {

  async update(req, res) {
    try {
      const location = await locationService.updateLocation(
        req.body.busId,
        req.body
      );

      // Emit WebSocket event
      req.io.emit('bus:location:update', location);

      return res.status(201).json({
        success: true,
        message: 'Location updated',
        location
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async latest(req, res) {
    try {
      const location = await locationService.getLatestLocation(
        Number(req.params.busId)
      );

      return res.status(200).json({
        success: true,
        location
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new LocationController();
