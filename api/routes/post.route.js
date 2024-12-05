import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletePost, getPosts, updatePost, uploadPostImage } from "../controllers/post.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.post('/upload-postImage',verifyToken, upload.single('PostImage'), uploadPostImage);
router.get('/getposts', getPosts);
router.delete('/deleteposts/:postId/:userId', verifyToken,deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);
export default router