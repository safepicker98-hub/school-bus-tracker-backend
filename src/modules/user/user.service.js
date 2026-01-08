const bcrypt = require('bcryptjs');
const userModel = require('./user.model');

class UserService {

  async getMyProfile(userId) {
    const user = await userModel.findById(userId);
    if (!user) throw new Error('User not found');

    delete user.password;
    return user;
  }

  async updateMyProfile(userId, payload) {
    const user = await userModel.findById(userId);
    if (!user) throw new Error('User not found');

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updatedUser = await userModel.update(userId, payload);
    delete updatedUser.password;

    return updatedUser;
  }

  async listUsers() {
    return await userModel.findAll();
  }

  async getUserById(id) {
    const user = await userModel.findById(id);
    if (!user) throw new Error('User not found');

    delete user.password;
    return user;
  }

  async createUser(payload) {
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const user = await userModel.create(payload);
    delete user.password;

    return user;
  }

  async updateUser(id, payload) {
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updatedUser = await userModel.update(id, payload);
    delete updatedUser.password;

    return updatedUser;
  }

  async disableUser(id) {
    await userModel.update(id, { isActive: false });
    return true;
  }

  async saveDeviceToken(userId, deviceToken) {
    if (!deviceToken) {
      throw new Error('Device token is required');
    }

    await userModel.saveDeviceToken(userId, deviceToken);
    return true;
  }
}

module.exports = new UserService();
