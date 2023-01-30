import express from 'express';
import {
	getAllFrases,
	getFrase,
	createFrase,
	updateFrase,
	deleteFrase,
} from '../controllers/frasesController.js';

const router = express.Router();

router.get('/', getAllFrases);
router.get('/:id', getFrase);
router.post('/', createFrase);
router.put('/:id', updateFrase);
router.delete('/:id', deleteFrase);

export default router;
