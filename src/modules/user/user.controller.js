const userService = require('./user.service');

class UserController {

  async me(req, res) {
    try {
      const user = await userService.getMyProfile(req.user.userId);
      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateMe(req, res) {
    try {
      const user = await userService.updateMyProfile(
        req.user.userId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async list(req, res) {
    try {
      const users = await userService.listUsers();
      return res.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const user = await userService.updateUser(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async disable(req, res) {
    try {
      await userService.disableUser(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'User disabled successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async saveDeviceToken(req, res) {
    try {
      await userService.saveDeviceToken(
        req.user.userId,
        req.body.deviceToken
      );

      return res.status(200).json({
        success: true,
        message: 'Device token saved successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new UserController();