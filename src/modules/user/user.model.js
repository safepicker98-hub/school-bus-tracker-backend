const prisma = require('../../prisma/client');

console.log('USER MODEL LOADED FROM:', __filename);

class UserModel {

  async findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async create(data) {
    return prisma.user.create({
      data
    });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async disable(id) {
    return prisma.user.update({
      where: { id },
      data: { isActive: false }
    });
  }

  async saveDeviceToken(userId, deviceToken) {
    return prisma.user.update({
      where: { id: userId },
      data: { deviceToken }
    });
  }
}

module.exports = new UserModel();
