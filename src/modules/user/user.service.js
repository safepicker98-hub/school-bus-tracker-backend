const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const logger = require('../../config/logger');
const firebase = require('../../integrations/firebase/firebase');

class UserService {

  async getMyProfile(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) throw new Error('User not found');

      delete user.password;
      return user;
    } catch (err) {
      logger.error('Failed to get profile for user %s', userId, { err });
      throw err;
    }
  }

  async updateMyProfile(userId, payload) {
    try {
      const user = await userModel.findById(userId);
      if (!user) throw new Error('User not found');

      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      }

      const updatedUser = await userModel.update(userId, payload);
      delete updatedUser.password;

      return updatedUser;
    } catch (err) {
      logger.error('Failed to update profile for user %s', userId, { err });
      throw err;
    }
  }

  async listUsers() {
    try {
      return await userModel.findAll();
    } catch (err) {
      logger.error('Failed to list users', { err });
      throw err;
    }
  }

  async getUserById(id) {
    try {
      const user = await userModel.findById(id);
      if (!user) throw new Error('User not found');

      delete user.password;
      return user;
    } catch (err) {
      logger.error('Failed to get user by id %s', id, { err });
      throw err;
    }
  }

  async createUser(payload) {
    try {
      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      }

      const user = await userModel.create(payload);
      delete user.password;

      // Send a welcome notification (topic based) – adjust as needed
      try {
        await firebase.sendNotification('/users', {
          title: 'Welcome to Safe Bus Tracker',
          body: `User ${user.email || 'new user'} created successfully`,
        });
        logger.info('Welcome notification sent for user %s', user.id);
      } catch (notifyErr) {
        logger.warn('Failed to send welcome notification', { err: notifyErr });
      }

      return user;
    } catch (err) {
      logger.error('Failed to create user', { err });
      throw err;
    }
  }

  async updateUser(id, payload) {
    try {
      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      }

      const updatedUser = await userModel.update(id, payload);
      delete updatedUser.password;

      return updatedUser;
    } catch (err) {
      logger.error('Failed to update user %s', id, { err });
      throw err;
    }
  }

  async disableUser(id) {
    try {
      await userModel.update(id, { isActive: false });
      return true;
    } catch (err) {
      logger.error('Failed to disable user %s', id, { err });
      throw err;
    }
  }

  async saveDeviceToken(userId, deviceToken) {
    try {
      if (!deviceToken) {
        throw new Error('Device token is required');
      }

      await userModel.saveDeviceToken(userId, deviceToken);
      return true;
    } catch (err) {
      logger.error('Failed to save device token for user %s', userId, { err });
      throw err;
    }
  }
}

module.exports = new UserService();
