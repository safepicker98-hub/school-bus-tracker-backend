const prisma = require('../../prisma/client');

class ETA {
  async getBusLocation(busId) {
    return prisma.busLocation.findFirst({
      where: { busId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStop(stopId) {
    return prisma.stop.findUnique({
      where: { id: stopId },
    });
  }

  async getStudent(studentId) {
    return prisma.student.findUnique({
      where: { id: studentId },
      include: { stop: true },
    });
  }
}

module.exports = new ETA();
