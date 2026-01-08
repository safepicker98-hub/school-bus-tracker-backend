const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Middlewares (assumed)
const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');

// Logged-in user routes
router.get('/me', verifyToken, userController.me.bind(userController));
router.put('/me', verifyToken, userController.updateMe.bind(userController));
router.post('/device-token', verifyToken, userController.saveDeviceToken.bind(userController));

// Admin routes
router.get('/', verifyToken, adminOnly, userController.list.bind(userController));
router.get('/:id', verifyToken, adminOnly, userController.getById.bind(userController));
router.post('/', verifyToken, adminOnly, userController.create.bind(userController));
router.put('/:id', verifyToken, adminOnly, userController.update.bind(userController));
router.delete('/:id', verifyToken, adminOnly, userController.disable.bind(userController));

module.exports = router;
