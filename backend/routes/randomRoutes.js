import express from 'express';

const randomRouter = express.Router();

import { getFraseRandom } from '../controllers/randomController.js';

randomRouter.get('/', getFraseRandom);

export default randomRouter;
