import express from 'express';

const searchRouter = express.Router();

import { getSearch } from '../controllers/searchController.js';

searchRouter.get('/', getSearch);

export default searchRouter;
