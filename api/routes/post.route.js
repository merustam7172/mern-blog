import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, uploadPostImage } from "../controllers/post.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.post('/upload-postImage',verifyToken, upload.single('PostImage'), uploadPostImage);
export default router