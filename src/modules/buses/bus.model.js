const prisma = require('../../prisma/client');

class BusModel {

  async create(data) {
    return prisma.bus.create({
      data
    });
  }

  async findAll() {
    return prisma.bus.findMany({
      include: {
        driver: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return prisma.bus.findUnique({
      where: { id },
      include: {
        driver: true
      }
    });
  }

  async update(id, data) {
    return prisma.bus.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.bus.delete({
      where: { id }
    });
  }

  async assignDriver(busId, driverId) {
    return prisma.bus.update({
      where: { id: busId },
      data: { driverId }
    });
  }
}

module.exports = new BusModel();
