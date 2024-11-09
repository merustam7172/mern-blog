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