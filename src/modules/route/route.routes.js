const express = require('express');
const router = express.Router();
const routeController = require('./route.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');

// Admin-only routes
router.post('/', verifyToken, adminOnly, routeController.create.bind(routeController));
router.get('/', verifyToken, adminOnly, routeController.list.bind(routeController));
router.get('/:id', verifyToken, adminOnly, routeController.getById.bind(routeController));
router.put('/:id', verifyToken, adminOnly, routeController.update.bind(routeController));
router.delete('/:id', verifyToken, adminOnly, routeController.delete.bind(routeController));

module.exports = router;
