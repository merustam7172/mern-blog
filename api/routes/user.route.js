import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
// import  upload  from '../utils/multer.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
// router.post('/upload-image', verifyToken, upload.single('profilePicture'), uploadImage);
router.put('/update/:userId', verifyToken, updateUser);

export default router;