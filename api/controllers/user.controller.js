import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
// import cloudinary from 'cloudinary';


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });


export const test = (req,res) => {
    res.json({message : "API testing"})
} 


// Profile update functinality


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
  }

  if(req.body.username !== req.body.username.toLowerCase()){
    return next(errorHandler(400, 'Username must be lowercase'))
  }

  if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
    return next(errorHandler(400, 'Username only contain letters and numbers'))
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
  
  