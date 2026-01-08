const adminOrParent = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized: No user info' });
  }

  // Allow if role is admin or parent
  if (req.user.role === 'admin' || req.user.role === 'parent') {
    return next();
  }

  return res
    .status(403)
    .json({ success: false, message: 'Forbidden: Admin or Parent only' });
};

module.exports = adminOrParent;
