const prisma = require('../../prisma/client');

class AuthModel {

  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findUserById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async createUser(data) {
    return prisma.user.create({
      data
    });
  }

  async updatePassword(userId, password) {
    return prisma.user.update({
      where: { id: userId },
      data: { password }
    });
  }
}

module.exports = new AuthModel();
