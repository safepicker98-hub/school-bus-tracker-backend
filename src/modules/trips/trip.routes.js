const express = require('express');
const router = express.Router();
const tripController = require('./trip.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOnly = require('../../middlewares/adminOnly');
const driverOnly = require('../../middlewares/driverOnly');
const parentOnly = require('../../middlewares/parentOnly');

// Driver
router.post(
  '/trips/start',
  verifyToken,
  driverOnly,
  tripController.start.bind(tripController)
);

router.post(
  '/trips/end',
  verifyToken,
  driverOnly,
  tripController.end.bind(tripController)
);

// Admin
router.get(
  '/trips/active',
  verifyToken,
  adminOnly,
  tripController.active.bind(tripController)
);

router.get(
  '/trips/history',
  verifyToken,
  adminOnly,
  tripController.history.bind(tripController)
);

router.get(
  '/trips/:id',
  verifyToken,
  adminOnly,
  tripController.details.bind(tripController)
);

// Parent
router.get(
  '/parents/trips',
  verifyToken,
  parentOnly,
  tripController.parentTrips.bind(tripController)
);

module.exports = router;
