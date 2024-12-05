import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import { userValidationSchema } from '../validations/userValidation.js';
import { loginValidationSchema } from '../validations/loginValidation.js';
import { forgotPasswordValidationSchema } from '../validations/forgotPasswordValidation.js';
import { resetPasswordValidationSchema } from '../validations/resetPasswordValidation.js';

export const register = async (req, res) => {
  try {
    const validatedData = await userValidationSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { name, username, password, avatar } = validatedData;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'The user is already in use' });
    }

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
    if (error.isJoi) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }

    const { username, password } = value;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ error: 'The username or password is incorrect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: 'The username or password is incorrect' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        loginAt: new Date().toISOString(),
      },
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
    const { error, value } = forgotPasswordValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }

    const { username } = value;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Username not found' });

    const resetToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Reset token generated', resetToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { error, value } = resetPasswordValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }

    const { resetToken, newPassword } = value;

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
