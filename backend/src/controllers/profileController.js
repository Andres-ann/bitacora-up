import { userModel } from '../models/userModel.js';
import { updateProfileValidationSchema } from '../validations/updateProfileValidation.js';
import cloudinary from '../config/cloudinaryConfig.js';

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
    const { error, value } = updateProfileValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }

    const userIdFromToken = req.user.id;
    const { name, username } = value;

    const existingUser = await userModel.findOne({ username });
    if (existingUser && existingUser._id.toString() !== userIdFromToken) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userIdFromToken,
        { name, username },
        { new: true, runValidators: true }
      )
      .select('-password');

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

export const updateAvatar = async (req, res) => {
  try {
    const userIdFromToken = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({ error: 'File must be an image' });
    }

    const streamUpload = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
    };

    const result = await streamUpload(file);

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userIdFromToken,
        { avatar: result.secure_url },
        { new: true, runValidators: true }
      )
      .select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Avatar updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res
      .status(500)
      .json({ error: 'Error updating avatar', details: error.message });
  }
};
