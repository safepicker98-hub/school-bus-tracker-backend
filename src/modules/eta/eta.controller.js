const etaService = require('./eta.service');

class ETAController {
  async busETA(req, res) {
    try {
      const { busId, stopId } = req.params;
      const eta = await etaService.getETAtoStop(Number(busId), Number(stopId));
      res.status(200).json({ success: true, eta });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async studentETA(req, res) {
    try {
      const { studentId } = req.params;
      const eta = await etaService.getStudentETA(Number(studentId));
      res.status(200).json({ success: true, eta });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ETAController();
