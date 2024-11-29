import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const authRouter = express.Router();

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
  checkUsername,
} from '../controllers/userController.js';

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword', resetPassword);
authRouter.post('/checkUsername', checkUsername);
authRouter.put('/updateUser/:id', isAuthenticated, updateUser);

export default authRouter;
