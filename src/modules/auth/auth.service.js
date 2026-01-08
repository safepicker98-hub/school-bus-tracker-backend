const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('./auth.model');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_EXPIRES_IN = '1d';

class AuthService {

  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const existingUser = await authModel.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authModel.createUser({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    delete user.password;
    return user;
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await authModel.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    delete user.password;

    return {
      token,
      user
    };
  }

  async refreshToken({ userId }) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await authModel.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { token };
  }

  async logout() {
    // JWT logout is handled on client side
    return true;
  }

  async forgotPassword(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await authModel.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // You can generate reset token & send email here
    return true;
  }

  async resetPassword({ userId, newPassword }) {
    if (!userId || !newPassword) {
      throw new Error('User ID and new password are required');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authModel.updatePassword(userId, hashedPassword);

    return true;
  }
}

module.exports = new AuthService();
