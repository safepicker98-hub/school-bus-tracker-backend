const attendanceService = require('./attendance.service');

class AttendanceController {
  async board(req, res) {
    try {
      const { tripId, studentId } = req.body;
      const record = await attendanceService.boardStudent({ tripId, studentId });
      res.status(201).json({ success: true, message: 'Student boarded', record });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deboard(req, res) {
    try {
      const { tripId, studentId } = req.body;
      const record = await attendanceService.deboardStudent({ tripId, studentId });
      res.status(201).json({ success: true, message: 'Student deboarded', record });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async tripAttendance(req, res) {
    try {
      const { tripId } = req.params;
      const records = await attendanceService.getTripAttendance(Number(tripId));
      res.status(200).json({ success: true, records });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async studentAttendance(req, res) {
    try {
      const studentId = req.user.userId; // Parent can see their child attendance
      const records = await attendanceService.getStudentAttendance(Number(studentId));
      res.status(200).json({ success: true, records });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new AttendanceController();
