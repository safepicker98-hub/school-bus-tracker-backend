const express = require('express');
const router = express.Router();
const attendanceController = require('./attendance.controller');

const verifyToken = require('../../middlewares/verifyToken');
const driverOnly = require('../../middlewares/driverOnly');
const adminOnly = require('../../middlewares/adminOnly');
const parentOnly = require('../../middlewares/parentOnly');

// Driver scans
router.post('/attendance/board', verifyToken, driverOnly, attendanceController.board.bind(attendanceController));
router.post('/attendance/deboard', verifyToken, driverOnly, attendanceController.deboard.bind(attendanceController));

// Admin views trip attendance
router.get('/attendance/trip/:tripId', verifyToken, adminOnly, attendanceController.tripAttendance.bind(attendanceController));

// Parent views child attendance
router.get('/parents/attendance', verifyToken, parentOnly, attendanceController.studentAttendance.bind(attendanceController));

module.exports = router;
