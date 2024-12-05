import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRouter from './src/routes/authRoutes.js';
import profileRouter from './src/routes/profileRouter.js';
import frasesRouter from './src/routes/frasesRoutes.js';
import randomRouter from './src/routes/randomRoutes.js';
import searchRouter from './src/routes/searchRoutes.js';

const app = express();
dotenv.config();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/frases', frasesRouter);
app.use('/api/v1/random', randomRouter);
app.use('/api/v1/search', searchRouter);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const start = async () => {
  try {
    connectDB(MONGODB_URI);
    console.log('Mongodb database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error connection: ${error}`);
  }
};

start();
