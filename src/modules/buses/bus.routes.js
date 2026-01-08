const express = require('express');
const router = express.Router();
const busController = require('./bus.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');

// Admin routes
router.post('/', verifyToken, adminOnly, busController.create.bind(busController));
router.get('/', verifyToken, adminOnly, busController.list.bind(busController));
router.get('/:id', verifyToken, adminOnly, busController.getById.bind(busController));
router.put('/:id', verifyToken, adminOnly, busController.update.bind(busController));
router.delete('/:id', verifyToken, adminOnly, busController.delete.bind(busController));
router.post('/assign-driver', verifyToken, adminOnly, busController.assignDriver.bind(busController));

module.exports = router;
