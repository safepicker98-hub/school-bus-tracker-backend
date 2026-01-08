const notificationService = require('./notification.service');

class NotificationController {
  async send(req, res) {
    try {
      const { title, message, type, userId } = req.body;
      const notification = await notificationService.send({ title, message, type, userId });
      res.status(201).json({ success: true, notification });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async list(req, res) {
    try {
      const userId = req.user.userId;
      const notifications = await notificationService.list(userId);
      res.status(200).json({ success: true, notifications });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async markRead(req, res) {
    try {
      const { id } = req.params;
      const notification = await notificationService.markRead(Number(id));
      res.status(200).json({ success: true, notification });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new NotificationController();
