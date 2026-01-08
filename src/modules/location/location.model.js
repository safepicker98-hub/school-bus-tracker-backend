const prisma = require('../../prisma/client');

class LocationModel {

  async create(data) {
    return prisma.busLocation.create({ data });
  }

  async findLatestByBus(busId) {
    return prisma.busLocation.findFirst({
      where: { busId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = new LocationModel();
