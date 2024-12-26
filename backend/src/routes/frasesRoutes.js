import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const frasesRouter = express.Router();

import {
  getAllFrases,
  getFrase,
  createFrase,
  updateFrase,
  deleteFrase,
  addLike,
  addView,
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
frasesRouter.post('/:id/addlike', addLike);
frasesRouter.post('/addview/:id', addView);
frasesRouter.put(
  '/:fraseId/comments/:commentId',
  isAuthenticated,
  updateComentario
);
frasesRouter.delete(
  '/:fraseId/comments/:commentId',
  isAuthenticated,
  deleteComentario
);

export default frasesRouter;
