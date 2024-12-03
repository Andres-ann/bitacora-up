import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const frasesRouter = express.Router();

import {
  getAllFrases,
  getFrase,
  createFrase,
  updateFrase,
  deleteFrase,
  addComements,
  updateComentario,
} from '../controllers/frasesController.js';

frasesRouter.get('/', getAllFrases);
frasesRouter.get('/:id', getFrase);
frasesRouter.post('/', isAuthenticated, createFrase);
frasesRouter.post('/:id/addComment', isAuthenticated, addComements);
frasesRouter.put('/:id', isAuthenticated, updateFrase);
frasesRouter.delete('/:id/comment/:id', isAuthenticated, deleteFrase);
frasesRouter.put(
  '/:fraseId/comment/:comentarioId',
  isAuthenticated,
  updateComentario
);

export default frasesRouter;
