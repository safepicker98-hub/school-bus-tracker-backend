const morgan = require('morgan');

// Custom token for user ID if available
morgan.token('user-id', (req) => {
  return req.user ? req.user.id : 'anonymous';
});

// Create custom format
const requestLogger = morgan(':method :url :status :response-time ms - :user-id');

module.exports = requestLogger;
