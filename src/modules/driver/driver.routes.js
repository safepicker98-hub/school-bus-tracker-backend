const express = require('express');
const router = express.Router();
const driverController = require('./driver.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');
const driverOnly = require('../../middlewares/driverOnly');

// Admin routes
router.post('/', verifyToken, adminOnly, driverController.create.bind(driverController));
router.get('/', verifyToken, adminOnly, driverController.list.bind(driverController));
router.get('/:id', verifyToken, adminOnly, driverController.getById.bind(driverController));
router.put('/:id', verifyToken, adminOnly, driverController.update.bind(driverController));

// Driver route
router.get('/me', verifyToken, driverOnly, driverController.me.bind(driverController));

module.exports = router;
