const express = require('express');
const router = express.Router();
const locationController = require('./location.controller');

const verifyToken = require('../../middlewares/verifyToken');
const adminOrParent = require('../../middlewares/adminOrParent');
const driverOnly = require('../../middlewares/driverOnly');

// GPS / Driver
router.post(
  '/location/update',
  verifyToken,
  driverOnly,
  locationController.update.bind(locationController)
);

// Parent / Admin
router.get(
  '/location/bus/:busId',
  verifyToken,
  adminOrParent,
  locationController.latest.bind(locationController)
);

module.exports = router;
