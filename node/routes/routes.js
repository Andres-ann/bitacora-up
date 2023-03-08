import express from 'express';
import {
	getAllFrases,
	getFrase,
	createFrase,
	updateFrase,
	deleteFrase,
} from '../controllers/frasesController.js';

import {
	getAllHashtags,
	getHashtag,
	createHashtag,
	updateHashtag,
	deleteHashtag,
} from '../controllers/hashtagsCotroller';

const router = express.Router();

router.get('/', getAllFrases);
router.get('/:id', getFrase);
router.post('/', createFrase);
router.put('/:id', updateFrase);
router.delete('/:id', deleteFrase);

router.get('/', getAllHashtags);
router.get('/:id', getHashtag);
router.post('/', createHashtag);
router.put('/:id', updateHashtag);
router.delete('/:id', deleteHashtag);

export default router;
