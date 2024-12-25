import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js'
import CommentRoutes from './routes/comment.route.js'
dotenv.config();
import path from "path";

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("Mongo DB is connected Succssfully");
  })
  .catch((err) => console.log(err));

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', CommentRoutes);

app.use(express.static(path.join(__dirname, '/Client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
})
// middleware for errorhandle
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})