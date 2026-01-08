const notificationModel = require('./notification.model');

class NotificationService {
  // Admin manually sends a notification
  async send({ title, message, type = 'custom', userId = null }) {
    return notificationModel.create({ title, message, type, userId });
  }

  // Get notifications for a user
  async list(userId) {
    return notificationModel.getAll(userId);
  }

  // Mark a notification as read
  async markRead(id) {
    return notificationModel.markRead(id);
  }

  // Triggers: Boarding, Deboarding, ETA, Panic, Route change
  async trigger({ type, title, message, userId = null }) {
    return this.send({ type, title, message, userId });
  }
}

module.exports = new NotificationService();
