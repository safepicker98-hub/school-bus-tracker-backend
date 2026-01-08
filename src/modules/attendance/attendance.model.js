const prisma = require('../../prisma/client');

class AttendanceModel {
  async create(data) {
    return prisma.attendance.create({ data });
  }

  async getTripAttendance(tripId) {
    return prisma.attendance.findMany({
      where: { tripId },
      include: { student: true },
      orderBy: { timestamp: 'asc' },
    });
  }

  async getStudentAttendance(studentId) {
    return prisma.attendance.findMany({
      where: { studentId },
      include: { trip: true },
      orderBy: { timestamp: 'desc' },
    });
  }
}

module.exports = new AttendanceModel();
