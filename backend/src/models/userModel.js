import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ username: 'text' });

export const userModel = mongoose.model('User', userSchema);
