const express = require('express');
const router = express.Router();

const userRoutes = require('../modules/user/user.routes');
const authRoutes = require('../modules/auth/auth.routes');
const studentRoutes = require('../modules/students/student.routes');
const busRoutes = require('../modules/buses/bus.routes');
const routeRoutes = require('../modules/route/route.routes');
const tripRoutes = require('../modules/trips/trip.routes');
const locationRoutes = require('../modules/location/location.routes');
const etaRoutes = require('../modules/eta/eta.routes');
const attendanceRoutes = require('../modules/attendance/attendance.routes');
const notificationRoutes = require('../modules/notification/notification.routes');
const chatRoutes = require('../modules/chats/chat.routes');
const panicRoutes = require('../modules/panic/panic.routes');

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/buses', busRoutes);
router.use('/routes', routeRoutes);
router.use('/trips', tripRoutes);
router.use('/location', locationRoutes);
router.use('/eta', etaRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/chats', chatRoutes);
router.use('/panic', panicRoutes);

module.exports = router;
