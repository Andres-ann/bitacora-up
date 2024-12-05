import express from 'express';
import { isAuthorized } from '../middlewares/isAuthorized.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const profileRouter = express.Router();

import {
  getProfile,
  updateProfile,
  checkUsername,
} from '../controllers/profileController.js';

profileRouter.get('/:id', isAuthenticated, getProfile);
profileRouter.post('/checkUsername', checkUsername);
profileRouter.put('/updateUser/:id', isAuthorized, updateProfile);

export default profileRouter;
