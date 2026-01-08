const express = require('express');
const router = express.Router();
const stopController = require('./stop.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');

// Stops
router.post(
  '/routes/:id/stops',
  verifyToken,
  adminOnly,
  stopController.addStop.bind(stopController)
);

router.put(
  '/stops/:id',
  verifyToken,
  adminOnly,
  stopController.update.bind(stopController)
);

router.delete(
  '/stops/:id',
  verifyToken,
  adminOnly,
  stopController.delete.bind(stopController)
);

router.post(
  '/stops/assign-student',
  verifyToken,
  adminOnly,
  stopController.assignStudent.bind(stopController)
);

module.exports = router;
