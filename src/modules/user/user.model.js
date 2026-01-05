const prisma = require('../../prisma/client');

console.log('USER MODEL LOADED FROM:', __filename);

exports.findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  });
};

exports.createUser = async (data) => {
  return prisma.user.create({ data });
};

exports.getAllUsers = async () => {
  return prisma.user.findMany();
};
