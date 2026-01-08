const prisma = require('../../prisma/client');

class StudentModel {

  async create(data) {
    return prisma.student.create({
      data
    });
  }

  async findAll() {
    return prisma.student.findMany({
      include: {
        parent: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return prisma.student.findUnique({
      where: { id },
      include: {
        parent: true
      }
    });
  }

  async update(id, data) {
    return prisma.student.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.student.delete({
      where: { id }
    });
  }

  async findByParentId(parentId) {
    return prisma.student.findMany({
      where: { parentId }
    });
  }

  async assignParent(studentId, parentId) {
    return prisma.student.update({
      where: { id: studentId },
      data: { parentId }
    });
  }
}

module.exports = new StudentModel();
