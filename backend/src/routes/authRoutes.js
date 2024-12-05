import express from 'express';

const authRouter = express.Router();

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword', resetPassword);

export default authRouter;
