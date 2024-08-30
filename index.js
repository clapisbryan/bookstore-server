import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { userRoute } from './routes/user.js';
import { bookRoute } from './routes/book.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-type']
}));

app.use("/", userRoute);
app.use("/books", bookRoute);

mongoose.connect(process.env.MONGODB_STRING, console.log('App connected to database'))

app.listen(process.env.PORT, () => {
    console.log(`Server start at ${process.env.PORT}`);
})

