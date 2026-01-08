const prisma = require('../../prisma/client');

class ChatModel {
  async createChat(data) {
    return prisma.chat.create({
      data: {
        name: data.name || null,
        participants: {
          create: data.participants.map(userId => ({ userId })),
        },
      },
      include: { participants: true },
    });
  }

  async listChats(userId) {
    return prisma.chat.findMany({
      where: { participants: { some: { userId } } },
      include: { participants: { include: { user: true } }, messages: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMessages(chatId) {
    return prisma.message.findMany({
      where: { chatId },
      include: { sender: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendMessage({ chatId, senderId, content }) {
    return prisma.message.create({
      data: { chatId, senderId, content },
      include: { sender: true },
    });
  }
}

module.exports = new ChatModel();
