import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import frasesRouter from './routes/frasesRoutes.js';
import randomRouter from './routes/randomRoutes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/frases', frasesRouter);
app.use('/api/random', randomRouter);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
	try {
		connectDB(MONGO_URI);
		console.log('Mongodb database connected');
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`Error connection: ${error}`);
	}
};

start();
