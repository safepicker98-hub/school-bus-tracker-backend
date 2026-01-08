const routeService = require('./route.service');

class RouteController {

  async create(req, res) {
    try {
      const route = await routeService.createRoute(req.body);
      return res.status(201).json({
        success: true,
        message: 'Route created successfully',
        route
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async list(req, res) {
    try {
      const routes = await routeService.listRoutes();
      return res.status(200).json({
        success: true,
        routes
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const route = await routeService.getRouteById(req.params.id);
      return res.status(200).json({
        success: true,
        route
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const route = await routeService.updateRoute(
        req.params.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: 'Route updated successfully',
        route
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      await routeService.deleteRoute(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Route deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new RouteController();
