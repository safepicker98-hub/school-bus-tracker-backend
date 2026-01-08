const chatModel = require('./chat.model');

class ChatService {
  async createChat({ name, participants }) {
    return chatModel.createChat({ name, participants });
  }

  async listChats(userId) {
    return chatModel.listChats(userId);
  }

  async getMessages(chatId) {
    return chatModel.getMessages(chatId);
  }

  async sendMessage({ chatId, senderId, content }) {
    return chatModel.sendMessage({ chatId, senderId, content });
  }
}

module.exports = new ChatService();
