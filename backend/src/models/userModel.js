import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ['please complete this field'],
    },
    username: {
      type: String,
      required: [true, 'please complete this field'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please complete this field'],
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
