import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please complete this field'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please complete this field'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ username: 'text' });

export const userModel = mongoose.model('User', userSchema);
