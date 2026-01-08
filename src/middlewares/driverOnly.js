const driverOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'driver') {
    return res
      .status(403)
      .json({ success: false, message: 'Forbidden: Drivers only' });
  }
  next();
};

module.exports = driverOnly;
