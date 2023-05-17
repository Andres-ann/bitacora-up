import express from 'express';

const searchRouter = express.Router();

import { getQuery } from '../controllers/searchController.js';

searchRouter.get('/', getQuery);

export default searchRouter;
