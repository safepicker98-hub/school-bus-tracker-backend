const prisma = require('../../prisma/client');

class RouteModel {

  async create(data) {
    return prisma.route.create({
      data
    });
  }

  async findAll() {
    return prisma.route.findMany({
      include: {
        stops: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return prisma.route.findUnique({
      where: { id },
      include: {
        stops: true
      }
    });
  }

  async update(id, data) {
    return prisma.route.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.route.delete({
      where: { id }
    });
  }
}

module.exports = new RouteModel();
