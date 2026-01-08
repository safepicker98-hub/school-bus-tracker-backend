const panicService = require('./panic.service');

class PanicController {
  async trigger(req, res) {
    try {
      const driverId = req.user.userId;
      const { tripId, busId, studentId, description } = req.body;
      const panicAlert = await panicService.trigger({ driverId, tripId, busId, studentId, description });
      res.status(201).json({ success: true, message: 'Panic triggered', panicAlert });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async activeAlerts(req, res) {
    try {
      const alerts = await panicService.getActive();
      res.status(200).json({ success: true, alerts });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async resolve(req, res) {
    try {
      const { id } = req.params;
      const alert = await panicService.resolve(Number(id));
      res.status(200).json({ success: true, message: 'Alert resolved', alert });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new PanicController();
