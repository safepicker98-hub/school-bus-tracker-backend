const notificationModel = require('./notification.model');
const firebase = require('../../integrations/firebase/firebase');
const logger = require('../../config/logger');

class NotificationService {
  /**
   * Admin manually sends a notification and pushes via Firebase
   * @param {object} param0 - { title, message, type, userId }
   */
  async send({ title, message, type = 'custom', userId = null }) {
    try {
      const notification = await notificationModel.create({ title, message, type, userId });
      // Determine topic or token
      const topic = userId ? `/user_${userId}` : '/users';
      await firebase.sendNotification(topic, { title, body: message });
      logger.info('Notification created and push sent', { title, userId, type });
      return notification;
    } catch (err) {
      logger.error('Failed to send notification', { err, title, userId });
      throw err;
    }
  }

  // Get notifications for a user
  async list(userId) {
    try {
      return await notificationModel.getAll(userId);
    } catch (err) {
      logger.error('Failed to list notifications', { err, userId });
      throw err;
    }
  }

  // Mark a notification as read
  async markRead(id) {
    try {
      return await notificationModel.markRead(id);
    } catch (err) {
      logger.error('Failed to mark notification read', { err, id });
      throw err;
    }
  }

  // Generic trigger (kept for compatibility)
  async trigger({ type, title, message, userId = null }) {
    return this.send({ type, title, message, userId });
  }
}

module.exports = new NotificationService();
