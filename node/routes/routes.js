import express from 'express';

const router = express.Router();

import {
	getAllFrases,
	getFrase,
	createFrase,
	updateFrase,
	deleteFrase,
} from '../controllers/frasesController.js';

router.get('/', getAllFrases);
router.get('/:id', getFrase);
router.post('/', createFrase);
router.put('/:id', updateFrase);
router.delete('/:id', deleteFrase);

export default router;
