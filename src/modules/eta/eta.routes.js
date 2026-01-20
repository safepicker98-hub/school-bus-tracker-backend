const express = require('express');
const router = express.Router();
const etaController = require('./eta.controller');

const verifyToken = require('../../middlewares/verifyToken');
const parentOnly = require('../../middlewares/parentOnly');

/**
 * @swagger
 * tags:
 *   name: ETA
 *   description: Estimated Time of Arrival endpoints
 */

/**
 * @swagger
 * /api/eta/eta/bus/{busId}/stop/{stopId}:
 *   get:
 *     summary: Get ETA for bus to reach a specific stop (Parent only)
 *     tags: [ETA]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bus ID
 *       - in: path
 *         name: stopId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Stop ID
 *     responses:
 *       200:
 *         description: ETA retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 eta:
 *                   type: object
 *                   properties:
 *                     estimatedMinutes:
 *                       type: integer
 *                       example: 15
 *                     distance:
 *                       type: number
 *                       example: 5.2
 *       404:
 *         description: Bus or stop not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/eta/bus/:busId/stop/:stopId',
  verifyToken,
  parentOnly,
  etaController.busETA.bind(etaController)
);

/**
 * @swagger
 * /api/eta/eta/student/{studentId}:
 *   get:
 *     summary: Get ETA for student pickup/dropoff (Parent only)
 *     tags: [ETA]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student ETA retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 eta:
 *                   type: object
 *                   properties:
 *                     estimatedMinutes:
 *                       type: integer
 *                       example: 10
 *                     stopName:
 *                       type: string
 *                       example: Main Street Stop
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/eta/student/:studentId',
  verifyToken,
  parentOnly,
  etaController.studentETA.bind(etaController)
);

module.exports = router;
