import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = express.Router();

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
} from '../controllers/userController.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword', resetPassword);
authRouter.put('/updateUser', authenticate, updateUser);

export default authRouter;
