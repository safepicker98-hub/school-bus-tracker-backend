const prisma = require('../../prisma/client');

class PanicModel {
  async create(data) {
    return prisma.panic.create({ data });
  }

  async getActive() {
    return prisma.panic.findMany({
      where: { status: 'active' },
      include: { driver: true, trip: true, student: true, bus: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async resolve(id) {
    return prisma.panic.update({
      where: { id },
      data: { status: 'resolved', resolvedAt: new Date() },
    });
  }
}

module.exports = new PanicModel();
