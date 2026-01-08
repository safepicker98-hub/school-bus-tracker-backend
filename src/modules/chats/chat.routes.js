const express = require('express');
const router = express.Router();
const chatController = require('./chat.controller');

const verifyToken = require('../../middlewares/verifyToken');

// Create chat
router.post('/', verifyToken, chatController.createChat.bind(chatController));

// List chats
router.get('/', verifyToken, chatController.listChats.bind(chatController));

// Get messages in a chat
router.get('/:id/messages', verifyToken, chatController.getMessages.bind(chatController));

// Send message
router.post('/:id/messages', verifyToken, chatController.sendMessage.bind(chatController));

module.exports = router;
