import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import {uploadImageOnCloudinary} from '../utils/cloudinary.js'



export const test = (req,res) => {
    res.json({message : "API testing"})
} 


// Profile update functinality
export const updateProfile  = async(req,res,next) => {
  
  try {
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path
    
    // uploading image on cloudinary
    const {secure_url, public_id} =  await uploadImageOnCloudinary(picturePath, "User_Profiles")
    if(!secure_url){
      return res.status(400).json({
        success : false,
        message : 'Error while uploading image',
        error : secure_url
      });
    }

    console.log("Uploaded successfully");
    res.status(200).json(secure_url);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


// update user
export const updateUser = async (req, res,next) => {
  
  if(req.user.id !== req.params.userId){
    next(errorHandler(400, 'You are not allowed to update this User'))
  }
  if(req.body.password){
    if(req.body.password.length < 6){
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400, 'Username must be lowercase'))
    }
  
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400, 'Username only contain letters and numbers'))
    }
  }


  try {
    const id = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set : {
        username : req.body.username,
        email : req.body.email,
        profilePicture : req.body.profilePicture,
        password : req.body.password,
      }
    }, {new : true})

    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}
  
export const deleteUser = async(req,res,next) => {
  if(req.user.id !== req.params.userId){
    next(errorHandler(400, 'You are not allowed to update this User'))
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
}