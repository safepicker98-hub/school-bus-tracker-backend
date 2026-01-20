const express = require('express');
const router = express.Router();
const busController = require('./bus.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Bus management endpoints
 */

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus (Admin only)
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - busNumber
 *               - capacity
 *             properties:
 *               busNumber:
 *                 type: string
 *                 example: BUS-001
 *               capacity:
 *                 type: integer
 *                 example: 50
 *               model:
 *                 type: string
 *                 example: Mercedes-Benz Sprinter
 *     responses:
 *       201:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       403:
 *         description: Forbidden - Admin only
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', verifyToken, adminOnly, busController.create.bind(busController));

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: List all buses (Admin only)
 *     tags: [Buses]
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
 *     responses:
 *       200:
 *         description: Buses list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 buses:
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
router.get('/', verifyToken, adminOnly, busController.list.bind(busController));

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus by ID (Admin only)
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Bus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 bus:
 *                   type: object
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', verifyToken, adminOnly, busController.getById.bind(busController));

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update bus (Admin only)
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               model:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', verifyToken, adminOnly, busController.update.bind(busController));

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete bus (Admin only)
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', verifyToken, adminOnly, busController.delete.bind(busController));

/**
 * @swagger
 * /api/buses/assign-driver:
 *   post:
 *     summary: Assign driver to bus (Admin only)
 *     tags: [Buses]
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
 *               - driverId
 *             properties:
 *               busId:
 *                 type: integer
 *                 example: 1
 *               driverId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Driver assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: Bus or driver not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/assign-driver', verifyToken, adminOnly, busController.assignDriver.bind(busController));

module.exports = router;
