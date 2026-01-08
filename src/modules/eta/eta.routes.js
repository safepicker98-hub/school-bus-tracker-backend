const express = require('express');
const router = express.Router();
const etaController = require('./eta.controller');

const verifyToken = require('../../middlewares/verifyToken');
const parentOnly = require('../../middlewares/parentOnly');

// ETA for bus to stop
router.get(
  '/eta/bus/:busId/stop/:stopId',
  verifyToken,
  parentOnly,
  etaController.busETA.bind(etaController)
);

// ETA for student
router.get(
  '/eta/student/:studentId',
  verifyToken,
  parentOnly,
  etaController.studentETA.bind(etaController)
);

module.exports = router;
