import { userModel } from '../models/userModel.js';
import { userValidationSchema } from '../validations/userValidation.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }

    const userIdFromToken = req.user.id;
    const { name, username, avatar } = value;

    const updatedUser = await userModel.findByIdAndUpdate(
      userIdFromToken,
      { name, username, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const userExists = await userModel.findOne({ username });
    if (userExists) {
      return res.status(409).json({ error: 'Username is already taken' });
    }

    res.status(200).json({ message: 'Username is available' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
