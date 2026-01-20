const express = require('express');
const router = express.Router();
const attendanceController = require('./attendance.controller');

const verifyToken = require('../../middlewares/verifyToken');
const driverOnly = require('../../middlewares/driverOnly');
const adminOnly = require('../../middlewares/adminOnly');
const parentOnly = require('../../middlewares/parentOnly');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Student attendance tracking endpoints
 */

/**
 * @swagger
 * /api/attendance/attendance/board:
 *   post:
 *     summary: Mark student as boarded (Driver only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - tripId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               tripId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Student marked as boarded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       403:
 *         description: Forbidden - Driver only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/attendance/board', verifyToken, driverOnly, attendanceController.board.bind(attendanceController));

/**
 * @swagger
 * /api/attendance/attendance/deboard:
 *   post:
 *     summary: Mark student as deboarded (Driver only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - tripId
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               tripId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Student marked as deboarded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       403:
 *         description: Forbidden - Driver only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/attendance/deboard', verifyToken, driverOnly, attendanceController.deboard.bind(attendanceController));

/**
 * @swagger
 * /api/attendance/attendance/trip/{tripId}:
 *   get:
 *     summary: Get attendance for a trip (Admin only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip attendance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 attendance:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/attendance/trip/:tripId', verifyToken, adminOnly, attendanceController.tripAttendance.bind(attendanceController));

/**
 * @swagger
 * /api/attendance/parents/attendance:
 *   get:
 *     summary: Get attendance for my children (Parent only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-31
 *     responses:
 *       200:
 *         description: Student attendance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 attendance:
 *                   type: array
 *                   items:
 *                     type: object
 *       403:
 *         description: Forbidden - Parent only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/parents/attendance', verifyToken, parentOnly, attendanceController.studentAttendance.bind(attendanceController));

module.exports = router;
