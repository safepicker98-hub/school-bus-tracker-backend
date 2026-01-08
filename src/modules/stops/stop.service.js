const stopModel = require('./stop.model');
const routeModel = require('../routes/route.model');

class StopService {

  async addStopToRoute(routeId, payload) {
    const route = await routeModel.findById(routeId);
    if (!route) {
      throw new Error('Route not found');
    }

    return stopModel.create({
      ...payload,
      routeId
    });
  }

  async updateStop(id, payload) {
    await this.getStopById(id);
    return stopModel.update(id, payload);
  }

  async deleteStop(id) {
    await this.getStopById(id);
    return stopModel.delete(id);
  }

  async getStopById(id) {
    const stop = await stopModel.findById(id);
    if (!stop) {
      throw new Error('Stop not found');
    }
    return stop;
  }

  async assignStudent({ stopId, studentId }) {
    return stopModel.assignStudent(stopId, studentId);
  }
}

module.exports = new StopService();
