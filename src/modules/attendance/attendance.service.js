const attendanceModel = require('./attendance.model');
const notificationService = require('../notification/notification.service');
const studentModel = require('../students/student.model'); // to fetch parentId

class AttendanceService {
  /**
   * Student boards the bus
   * @param {Object} param0
   * @param {number} param0.tripId
   * @param {number} param0.studentId
   */
  async boardStudent({ tripId, studentId }) {
    // Create attendance record
    const record = await attendanceModel.create({
      tripId,
      studentId,
      type: 'board',
    });

    // Fetch student's parentId (assuming student has a parentId field)
    const student = await studentModel.findById(studentId);
    if (student && student.parentId) {
      await notificationService.trigger({
        type: 'boarding',
        title: 'Student Boarded',
        message: `Your child ${student.name} has boarded the bus.`,
        userId: student.parentId,
      });
    }

    return record;
  }

  /**
   * Student deboards the bus
   * @param {Object} param0
   * @param {number} param0.tripId
   * @param {number} param0.studentId
   */
  async deboardStudent({ tripId, studentId }) {
    // Create attendance record
    const record = await attendanceModel.create({
      tripId,
      studentId,
      type: 'deboard',
    });

    // Fetch student's parentId
    const student = await studentModel.findById(studentId);
    if (student && student.parentId) {
      await notificationService.trigger({
        type: 'deboarding',
        title: 'Student Deboarded',
        message: `Your child ${student.name} has left the bus.`,
        userId: student.parentId,
      });
    }

    return record;
  }

  /**
   * Get attendance for a trip
   * @param {number} tripId
   */
  async getTripAttendance(tripId) {
    return attendanceModel.getTripAttendance(tripId);
  }

  /**
   * Get attendance for a student (for parent)
   * @param {number} studentId
   */
  async getStudentAttendance(studentId) {
    return attendanceModel.getStudentAttendance(studentId);
  }
}

module.exports = new AttendanceService();
