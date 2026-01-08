const prisma = require('../../prisma/client');

class DriverBehaviorModel {
  async log(data) {
    return prisma.driverBehavior.create({ data });
  }

  async getDriverScore(driverId) {
    const behaviors = await prisma.driverBehavior.findMany({
      where: { driverId },
    });

    if (!behaviors.length) return { score: 100 }; // default score

    // Example: calculate score (simplified)
    let score = 100;
    behaviors.forEach(b => {
      if (b.eventType === 'speed' && b.speed > 60) score -= 5;
      if (b.eventType === 'braking' && b.braking > 3) score -= 5;
    });

    if (score < 0) score = 0;
    return { score };
  }

  async getDriverReports(driverId) {
    return prisma.driverBehavior.findMany({
      where: { driverId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new DriverBehaviorModel();
