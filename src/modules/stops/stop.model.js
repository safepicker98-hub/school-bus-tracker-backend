const prisma = require('../../prisma/client');

class StopModel {

  async create(data) {
    return prisma.stop.create({ data });
  }

  async findById(id) {
    return prisma.stop.findUnique({
      where: { id },
      include: {
        students: true,
        route: true
      }
    });
  }

  async update(id, data) {
    return prisma.stop.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.stop.delete({
      where: { id }
    });
  }

  async assignStudent(stopId, studentId) {
    return prisma.stop.update({
      where: { id: stopId },
      data: {
        students: {
          connect: { id: studentId }
        }
      }
    });
  }
}

module.exports = new StopModel();
