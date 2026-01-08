const parentOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'parent') {
    return res
      .status(403)
      .json({ success: false, message: 'Forbidden: Parents only' });
  }
  next();
};

module.exports = parentOnly;
