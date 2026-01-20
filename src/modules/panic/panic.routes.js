const express = require('express');
const router = express.Router();
const panicController = require('./panic.controller');

const verifyToken = require('../../middlewares/verifyToken');
const driverOnly = require('../../middlewares/driverOnly');
const adminOnly = require('../../middlewares/adminOnly');

/**
 * @swagger
 * tags:
 *   name: Panic
 *   description: Emergency panic alert endpoints
 */

/**
 * @swagger
 * /api/panic:
 *   post:
 *     summary: Trigger panic alert (Driver only)
 *     tags: [Panic]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busId
 *             properties:
 *               busId:
 *                 type: integer
 *                 example: 1
 *               reason:
 *                 type: string
 *                 example: Medical emergency
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     example: 40.7128
 *                   longitude:
 *                     type: number
 *                     example: -74.0060
 *     responses:
 *       201:
 *         description: Panic alert triggered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 alert:
 *                   type: object
 *       403:
 *         description: Forbidden - Driver only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', verifyToken, driverOnly, panicController.trigger.bind(panicController));

/**
 * @swagger
 * /api/panic/active:
 *   get:
 *     summary: Get active panic alerts (Admin only)
 *     tags: [Panic]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active alerts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 alerts:
 *                   type: array
 *                   items:
 *                     type: object
 *       403:
 *         description: Forbidden - Admin only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/active', verifyToken, adminOnly, panicController.activeAlerts.bind(panicController));

/**
 * @swagger
 * /api/panic/{id}/resolve:
 *   post:
 *     summary: Resolve a panic alert (Admin only)
 *     tags: [Panic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Panic alert ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: Situation handled, all safe
 *     responses:
 *       200:
 *         description: Panic alert resolved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Alert not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/resolve', verifyToken, adminOnly, panicController.resolve.bind(panicController));

module.exports = router;
