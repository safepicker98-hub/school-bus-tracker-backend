const etaModel = require('./eta.model');
const googleMaps = require('../../integrations/googleMaps/googleMapsService');
const logger = require('../../config/logger');

class ETAService {
  // Haversine formula to calculate distance in km
  _distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in km
  }

  async getETAtoStop(busId, stopId) {
    try {
      const busLoc = await etaModel.getBusLocation(busId);
      const stop = await etaModel.getStop(stopId);

      if (!busLoc || !stop) throw new Error('Bus or Stop not found');

      // Use Google Maps Distance Matrix for accurate ETA
      const origins = [`${busLoc.latitude},${busLoc.longitude}`];
      const destinations = [`${stop.latitude},${stop.longitude}`];
      const matrix = await googleMaps.getDistanceMatrix(origins, destinations);
      const element = matrix.rows[0].elements[0];
      const distanceKm = element.distance.value / 1000;
      const etaMinutes = Math.round(element.duration.value / 60);
      logger.info('Calculated ETA via Google Maps', { busId, stopId, distanceKm, etaMinutes });
      return { busId, stopId, distance: distanceKm, etaMinutes };
    } catch (err) {
      logger.error('Google Maps ETA calculation failed, falling back to haversine', { err, busId, stopId });
      // Fallback to haversine
      const busLoc = await etaModel.getBusLocation(busId);
      const stop = await etaModel.getStop(stopId);
      const distanceKm = this._distance(busLoc.latitude, busLoc.longitude, stop.latitude, stop.longitude);
      const speed = busLoc.speed || 20;
      const etaMinutes = Math.round((distanceKm / speed) * 60);
      return { busId, stopId, distance: distanceKm, etaMinutes };
    }
  }

  async getStudentETA(studentId) {
    const student = await etaModel.getStudent(studentId);
    if (!student) throw new Error('Student not found');
    if (!student.stop) throw new Error('Student stop not assigned');

    return this.getETAtoStop(student.stop.busId, student.stop.id);
  }
}

module.exports = new ETAService();
