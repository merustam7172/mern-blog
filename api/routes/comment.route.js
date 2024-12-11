import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createComment, getPostsComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostsComments);

export default router;