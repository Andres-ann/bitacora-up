import express from 'express';

const routerHt = express.Router();

import {
	getAllHashtags,
	getHashtag,
	createHashtag,
	updateHashtag,
	deleteHashtag,
} from '../controllers/hashtagsController.js';

routerHt.get('/', getAllHashtags);
routerHt.get('/:id', getHashtag);
routerHt.post('/', createHashtag);
routerHt.put('/:id', updateHashtag);
routerHt.delete('/:id', deleteHashtag);

export default routerHt;
