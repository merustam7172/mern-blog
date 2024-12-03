import Post from "../models/post.models.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const uploadPostImage = async (req, res, next) => {
  try {
    const picturePath = req.file?.path;
    if(!picturePath){
       return res.status(500).json(null);
    }
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "Post_Image"
    );
    if (!secure_url) {
      return res.status(400).json({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }

    console.log("Uploaded postImage successfully");
    res.status(200).json(secure_url);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
