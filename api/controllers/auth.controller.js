import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async ( req,res,next) => {
    const {username , email, password} = req.body;

    if (!username ||!email ||!password ||username === "" ||email === "" ||password === "") {
      next(errorHandler(400, 'All fields are required'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,email,password : hashedPassword
    });

    
    await newUser.save().then(() => {
        res.json('signUp Successfully')
    }).catch((err) => {
        next(err);
    })
}

// Signin functionality
export const signin = async(req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, 'Invalid username or Password'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);  // return true or false
        if(!validPassword){
            return next(errorHandler(400, 'Invalid Password'))
        }
        
        // Installing jsonwebtoken in root directory for sigin or giving session to user
        const token = jwt.sign(
          {
            id: validUser._id,
          },
          process.env.JWT_SECRET         // secret key
        );

        // don't want to show password on database so just separate and send the REST
        const {password : pass, ...rest} = validUser._doc;

        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json(rest);
       

    }catch (error) {
        next(error);
    }
}


export const google = async(req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body;
    try {
        // console.log("Start sign in Backend")

        const validUser = await User.findOne({ email });

        if(validUser){
            // Sign in
            const token = jwt.sign( {id : validUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = validUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly : true,
            }).json(rest);
        }
        else{
            // Sign Up
            // step-1 :first we have to create a random password
            // step-2 : add profile picture to user models
            // step-3 : Now perform signin functionality for new user 
            // console.log("Start sign Up in Backend")

            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username : name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
                email,
                password : hashedPassword,
                profilePicture : googlePhotoUrl
            });
            
            

            await newUser.save();

            const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly : true, 
            }).json(rest);


        }

    } catch (error) {
        next(error);
    }
    
}