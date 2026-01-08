const panicModel = require('./panic.model');
const notificationService = require('../notification/notification.service');

class PanicService {
  // Driver triggers panic
  async trigger({ driverId, tripId, busId, studentId, description }) {
    const panicAlert = await panicModel.create({
      driverId,
      tripId,
      busId,
      studentId,
      description,
    });

    // Notify admin(s)
    await notificationService.trigger({
      type: 'panic',
      title: 'Panic Alert',
      message: `Driver #${driverId} triggered panic!`,
      userId: null, // send to all admins
    });

    return panicAlert;
  }

  // Admin sees all active alerts
  async getActive() {
    return panicModel.getActive();
  }

  // Admin resolves alert
  async resolve(id) {
    return panicModel.resolve(id);
  }
}

module.exports = new PanicService();
