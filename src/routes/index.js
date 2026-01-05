const express = require('express');
const router = express.Router();

const userRoutes = require('../modules/user/user.routes');
const authRoutes = require('../modules/auth/auth.routes');

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
