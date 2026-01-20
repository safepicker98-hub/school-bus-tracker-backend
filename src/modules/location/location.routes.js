const express = require('express');
const router = express.Router();
const locationController = require('./location.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOrParent = require('../../middlewares/adminOrParent');
const driverOnly = require('../../middlewares/driverOnly');

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Real-time bus location tracking endpoints
 */

/**
 * @swagger
 * /api/location/location/update:
 *   post:
 *     summary: Update bus location (Driver only)
 *     tags: [Location]
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
 *               - latitude
 *               - longitude
 *             properties:
 *               busId:
 *                 type: integer
 *                 example: 1
 *               latitude:
 *                 type: number
 *                 format: double
 *                 example: 40.7128
 *               longitude:
 *                 type: number
 *                 format: double
 *                 example: -74.0060
 *               speed:
 *                 type: number
 *                 example: 45.5
 *               heading:
 *                 type: number
 *                 example: 180
 *     responses:
 *       200:
 *         description: Location updated successfully
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
router.post(
  '/location/update',
  verifyToken,
  driverOnly,
  locationController.update.bind(locationController)
);

/**
 * @swagger
 * /api/location/location/bus/{busId}:
 *   get:
 *     summary: Get latest bus location (Parent/Admin)
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Latest location retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 location:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       example: 40.7128
 *                     longitude:
 *                       type: number
 *                       example: -74.0060
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Location not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/location/bus/:busId',
  verifyToken,
  adminOrParent,
  locationController.latest.bind(locationController)
);

module.exports = router;
