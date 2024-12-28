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

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/frases', frasesRouter);
app.use('/api/v1/random', randomRouter);
app.use('/api/v1/search', searchRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    console.log('Successfully connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1);
  }
};

start();
