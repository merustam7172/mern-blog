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


// get posts

export const getPosts = async(req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId : req.query.userId}),
      ...(req.query.category && { userId : req.query.category}),
      ...(req.query.slug && { userId : req.query.slug}),
      ...(req.query.postId && { userId : req.query.postId}),
      ...(req.query.searchTerm && { 
        $or : [
          {title : {$regex : req.query.searchTerm, $options : 'i'}},

          {content : {$regex : req.query.searchTerm, $options : 'i'}}
        ]
      }),
    }).sort({ updatedAt : sortDirection}).skip(startIndex).limit(limit);


    // count the total number of posts
    const totalPosts = await Post.countDocuments();

    // count total post in last month
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt : {$gte : oneMonthAgo}
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts
    });

  } catch (error) {
    next(error);
  }
}

// delete post
export const deletePost = async(req, res, next) => {
  if( !req.user.isAdmin || req.user.id !== req.params.userId){
    return next(errorHandler(403,"You are not allowed to delete this post"));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted')

  } catch (error) {
    next(error)
  }
}