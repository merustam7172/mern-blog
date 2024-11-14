import express from 'express'
import { test, updateProfile, updateUser } from '../controllers/user.controller.js';
// import  upload  from '../utils/multer.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../utils/multer.js';
const router = express.Router();

router.get('/test', test);
router.post('/upload-image',verifyToken, upload.single('profilePicture'), updateProfile);
router.put('/update/:userId', verifyToken, updateUser);

export default router;