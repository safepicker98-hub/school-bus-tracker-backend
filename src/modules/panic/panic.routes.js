const express = require('express');
const router = express.Router();
const panicController = require('./panic.controller');

const verifyToken = require('../../middlewares/verifyToken');
const driverOnly = require('../../middlewares/driverOnly');
const adminOnly = require('../../middlewares/adminOnly');

// Driver triggers panic
router.post('/', verifyToken, driverOnly, panicController.trigger.bind(panicController));

// Admin views active alerts
router.get('/active', verifyToken, adminOnly, panicController.activeAlerts.bind(panicController));

// Admin resolves panic
router.post('/:id/resolve', verifyToken, adminOnly, panicController.resolve.bind(panicController));

module.exports = router;
