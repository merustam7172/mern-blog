import express from 'express'
import { deleteUser, getUser, getUsers, signoutUser, test, updateProfile, updateUser } from '../controllers/user.controller.js';
// import  upload  from '../utils/multer.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../utils/multer.js';
const router = express.Router();

router.get('/test', test);
router.post('/upload-image',verifyToken, upload.single('profilePicture'), updateProfile);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signoutUser);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', verifyToken, getUser);
export default router;