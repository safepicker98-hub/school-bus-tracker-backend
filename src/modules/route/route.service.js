const routeModel = require('./route.model');

class RouteService {

  async createRoute(payload) {
    if (!payload.name) {
      throw new Error('Route name is required');
    }
    return routeModel.create(payload);
  }

  async listRoutes() {
    return routeModel.findAll();
  }

  async getRouteById(id) {
    const route = await routeModel.findById(id);
    if (!route) {
      throw new Error('Route not found');
    }
    return route;
  }

  async updateRoute(id, payload) {
    await this.getRouteById(id);
    return routeModel.update(id, payload);
  }

  async deleteRoute(id) {
    await this.getRouteById(id);
    return routeModel.delete(id);
  }
}

module.exports = new RouteService();
