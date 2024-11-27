import express from 'express';

const frasesRouter = express.Router();

import {
	getAllFrases,
	getFrase,
	createFrase,
	updateFrase,
	deleteFrase,
} from '../controllers/frasesController.js';

frasesRouter.get('/', getAllFrases);
frasesRouter.get('/:id', getFrase);
frasesRouter.post('/', createFrase);
frasesRouter.put('/:id', updateFrase);
frasesRouter.delete('/:id', deleteFrase);

export default frasesRouter;
