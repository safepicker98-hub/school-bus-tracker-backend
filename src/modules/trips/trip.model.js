const prisma = require('../../prisma/client');

class TripModel {

  async create(data) {
    return prisma.trip.create({ data });
  }

  async findById(id) {
    return prisma.trip.findUnique({
      where: { id },
      include: {
        bus: true,
        driver: true,
        route: true
      }
    });
  }

  async findActive() {
    return prisma.trip.findMany({
      where: { status: 'ACTIVE' },
      include: {
        bus: true,
        driver: true,
        route: true
      }
    });
  }

  async findHistory() {
    return prisma.trip.findMany({
      where: { status: 'COMPLETED' },
      orderBy: { endedAt: 'desc' }
    });
  }

  async findByParent(parentId) {
    return prisma.trip.findMany({
      where: {
        students: {
          some: {
            parents: {
              some: { id: parentId }
            }
          }
        }
      }
    });
  }

  async update(id, data) {
    return prisma.trip.update({
      where: { id },
      data
    });
  }
}

module.exports = new TripModel();
