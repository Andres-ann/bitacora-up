import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import frasesRouter from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/frases', frasesRouter);
try {
	await db.authenticate();
	console.log('Conexión exitosa a la BD');
} catch (error) {
	console.log(`El error de conexión es ${error}`);
}

app.listen(8000, () => {
	console.log(`listening on port 8000`);
});
