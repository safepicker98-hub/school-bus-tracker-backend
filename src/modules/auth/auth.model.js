const prisma = require('../../prisma/client');

exports.findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

exports.createUser = (data) => {
  return prisma.user.create({ data });
};
