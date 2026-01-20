const logger = require('../config/logger');

/**
 * Winston based request logger middleware.
 * Logs method, URL, status, response time and optional user ID.
 */
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;
    const userId = req.user ? req.user.id : undefined;
    logger.info('HTTP %s %s %d %dms', method, originalUrl, statusCode, duration, {
      userId,
    });
  });

  next();
}

module.exports = requestLogger;
