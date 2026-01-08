const prisma = require('../../prisma/client');

class NotificationModel {
  async create(data) {
    return prisma.notification.create({ data });
  }

  async getAll(userId) {
    // If userId is provided, fetch notifications for user + general notifications
    return prisma.notification.findMany({
      where: {
        OR: [
          { userId: userId || undefined },
          { userId: null } // notifications for all
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async markRead(id) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
  }
}

module.exports = new NotificationModel();
