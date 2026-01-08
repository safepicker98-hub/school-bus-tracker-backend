const chatService = require('./chat.service');

class ChatController {
  async createChat(req, res) {
    try {
      const { name, participants } = req.body;
      const chat = await chatService.createChat({ name, participants });
      res.status(201).json({ success: true, chat });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async listChats(req, res) {
    try {
      const userId = req.user.userId;
      const chats = await chatService.listChats(userId);
      res.status(200).json({ success: true, chats });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMessages(req, res) {
    try {
      const { id } = req.params;
      const messages = await chatService.getMessages(Number(id));
      res.status(200).json({ success: true, messages });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async sendMessage(req, res) {
    try {
      const { id } = req.params;
      const senderId = req.user.userId;
      const { content } = req.body;
      const message = await chatService.sendMessage({ chatId: Number(id), senderId, content });
      res.status(201).json({ success: true, message });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new ChatController();
