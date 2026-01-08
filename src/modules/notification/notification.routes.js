const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');

// Admin sends notification
router.post('/send', verifyToken, adminOnly, notificationController.send.bind(notificationController));

// Get notification list for logged-in user
router.get('/', verifyToken, notificationController.list.bind(notificationController));

// Mark notification as read
router.put('/:id/read', verifyToken, notificationController.markRead.bind(notificationController));

module.exports = router;
