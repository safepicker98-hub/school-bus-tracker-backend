const tripService = require('./trip.service');

class TripController {

  async start(req, res) {
    try {
      const trip = await tripService.startTrip(
        req.user.id,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: 'Trip started',
        trip
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async end(req, res) {
    try {
      const trip = await tripService.endTrip(
        req.user.id,
        req.body.tripId
      );

      return res.status(200).json({
        success: true,
        message: 'Trip ended',
        trip
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async active(req, res) {
    try {
      const trips = await tripService.activeTrips();
      return res.status(200).json({
        success: true,
        trips
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async details(req, res) {
    try {
      const trip = await tripService.tripDetails(req.params.id);
      return res.status(200).json({
        success: true,
        trip
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async history(req, res) {
    try {
      const trips = await tripService.tripHistory();
      return res.status(200).json({
        success: true,
        trips
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async parentTrips(req, res) {
    try {
      const trips = await tripService.parentTrips(req.user.id);
      return res.status(200).json({
        success: true,
        trips
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TripController();
