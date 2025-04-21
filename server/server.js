import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // or whatever port your React app runs on
  credentials: true,
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server on port 5000'));
  })
  .catch(err => console.error(err));
