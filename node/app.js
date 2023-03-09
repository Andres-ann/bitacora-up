import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import frasesRouter from './routes/routes.js';
import hashtagsRouter from './routes/routesHt.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/frases', frasesRouter);
app.use('/hashtags', hashtagsRouter);
try {
	await db.authenticate();
	console.log('Successful connection to the DB');
} catch (error) {
	console.log(`El error de conexión es: ${error}`);
}

app.listen(8000, () => {
	console.log('Server UP running');
});
