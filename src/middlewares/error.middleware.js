const logger = require('../config/logger');

/**
 * Global error handling middleware.
 * Logs the error using Winston and returns a consistent JSON response.
 */
function errorHandler(err, req, res, next) {
  // Log the error with stack trace (if in development)
  logger.error('Error processing request', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    userId: req.user ? req.user.id : undefined,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // In development, include stack trace in response for easier debugging
  const response = {
    success: false,
    message,
  };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
