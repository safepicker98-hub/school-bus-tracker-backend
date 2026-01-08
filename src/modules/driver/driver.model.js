const prisma = require('../../prisma/client');

class DriverModel {

  async create(data) {
    return prisma.user.create({
      data: {
        ...data,
        role: 'driver'
      }
    });
  }

  async findAll() {
    return prisma.user.findMany({
      where: { role: 'driver' },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data
    });
  }
}

module.exports = new DriverModel();
