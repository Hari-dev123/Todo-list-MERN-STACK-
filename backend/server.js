import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';
import cors from 'cors';
import dataRoute from './routes.js';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/data',dataRoute);
app.listen(4000,()=>{
    console.log('port 4000 is running');
})