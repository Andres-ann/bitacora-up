import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const frasesRouter = express.Router();

import {
  getAllFrases,
  getFrase,
  createFrase,
  updateFrase,
  deleteFrase,
  addComentario,
  updateComentario,
  deleteComentario,
} from '../controllers/frasesController.js';

frasesRouter.get('/', getAllFrases);
frasesRouter.get('/:id', getFrase);
frasesRouter.post('/', isAuthenticated, createFrase);
frasesRouter.post('/:id/addComment', isAuthenticated, addComentario);
frasesRouter.put('/:id', isAuthenticated, updateFrase);
frasesRouter.delete('/:id', isAuthenticated, deleteFrase);
frasesRouter.put(
  '/:fraseId/comentarios/:comentarioId',
  isAuthenticated,
  updateComentario
);
frasesRouter.delete(
  '/:fraseId/comentarios/:comentarioId',
  isAuthenticated,
  deleteComentario
);

export default frasesRouter;
