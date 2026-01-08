const express = require('express');
const router = express.Router();
const driverBehaviorController = require('./driverBehavior.controller');

const verifyToken = require('../../middlewares/verifyToken');
const driverOnly = require('../../middlewares/driverOnly');
const adminOnly = require('../../middlewares/adminOnly');

// Driver logs speed / braking
router.post('/log', verifyToken, driverOnly, driverBehaviorController.log.bind(driverBehaviorController));

// Admin gets driver score
router.get('/drivers/:id/score', verifyToken, adminOnly, driverBehaviorController.getScore.bind(driverBehaviorController));

// Admin gets driver reports
router.get('/drivers/:id/reports', verifyToken, adminOnly, driverBehaviorController.getReports.bind(driverBehaviorController));

module.exports = router;
