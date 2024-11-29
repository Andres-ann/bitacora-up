import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

const SECRET_KEY = process.env.SECRET_KEY;
const RESET_TOKEN_EXPIRES = '15m';

export const register = async (req, res) => {
  try {
    const { name, username, password, avatar } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      username,
      password: hashedPassword,
      avatar,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        avatar: savedUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user)
      return res.status(404).json({ error: 'Incorrect username or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: 'Incorrect username or password' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

export const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Username not found' });

    const resetToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: RESET_TOKEN_EXPIRES }
    );

    res.status(200).json({ message: 'Reset token generated', resetToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const decoded = jwt.verify(resetToken, process.env.SECRET_KEY);
    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'Username not found' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    res.status(500).json({ error: error.message });
  }
};
