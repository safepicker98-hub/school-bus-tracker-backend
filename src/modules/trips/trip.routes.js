const express = require('express');
const router = express.Router();
const tripController = require('./trip.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');
const driverOnly = require('../../middlewares/driverOnly');
const parentOnly = require('../../middlewares/parentOnly');

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management and tracking endpoints
 */

/**
 * @swagger
 * /api/trips/trips/start:
 *   post:
 *     summary: Start a new trip (Driver only)
 *     tags: [Trips]
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
 *               - routeId
 *             properties:
 *               busId:
 *                 type: integer
 *                 example: 1
 *               routeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Trip started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 trip:
 *                   type: object
 *       403:
 *         description: Forbidden - Driver only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/trips/start',
  verifyToken,
  driverOnly,
  tripController.start.bind(tripController)
);

/**
 * @swagger
 * /api/trips/trips/end:
 *   post:
 *     summary: End an active trip (Driver only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripId
 *             properties:
 *               tripId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Trip ended successfully
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
  '/trips/end',
  verifyToken,
  driverOnly,
  tripController.end.bind(tripController)
);

/**
 * @swagger
 * /api/trips/trips/active:
 *   get:
 *     summary: Get all active trips (Admin only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active trips retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 trips:
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
router.get(
  '/trips/active',
  verifyToken,
  adminOnly,
  tripController.active.bind(tripController)
);

/**
 * @swagger
 * /api/trips/trips/history:
 *   get:
 *     summary: Get trip history (Admin only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: busId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 trips:
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
router.get(
  '/trips/history',
  verifyToken,
  adminOnly,
  tripController.history.bind(tripController)
);

/**
 * @swagger
 * /api/trips/trips/{id}:
 *   get:
 *     summary: Get trip details (Admin only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 trip:
 *                   type: object
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/trips/:id',
  verifyToken,
  adminOnly,
  tripController.details.bind(tripController)
);

/**
 * @swagger
 * /api/trips/parents/trips:
 *   get:
 *     summary: Get trips for parent's children (Parent only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Parent trips retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 trips:
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
router.get(
  '/parents/trips',
  verifyToken,
  parentOnly,
  tripController.parentTrips.bind(tripController)
);

module.exports = router;
