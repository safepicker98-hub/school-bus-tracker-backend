const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('./auth.model');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

exports.register = async (payload) => {
  const { name, email, password } = payload;

  const existing = await authModel.findUserByEmail(email);
  if (existing) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authModel.createUser({
    name,
    email,
    password: hashedPassword
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await authModel.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token, user };
};
