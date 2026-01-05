const bcrypt = require('bcryptjs');
const userModel = require('./user.model');

exports.registerUser = async ({ email, password, name }) => {
  const existing = await userModel.findUserByEmail(email);
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.createUser({ email, password: hashedPassword, name });
  return { id: user.id, email: user.email, name: user.name };
};

exports.getUsers = async () => userModel.getAllUsers();
