import express from 'express';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/uploadMiddleware.js';

const profileRouter = express.Router();

import {
  getProfile,
  updateProfile,
  checkUsername,
  updateAvatar,
} from '../controllers/profileController.js';

profileRouter.get('/:id', isAuthenticated, getProfile);
profileRouter.post('/checkUsername', checkUsername);
profileRouter.put('/updateUser/:id', isAuthorized, updateProfile);
profileRouter.post(
  '/updateAvatar/:id',
  isAuthorized,
  upload.single('avatar'),
  updateAvatar
);

export default profileRouter;
