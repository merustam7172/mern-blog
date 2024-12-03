import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        default : 'https://www.hostinger.in/tutorials/how-to-write-a-blog-post'
    },
    category : {
        type : String,
        default : 'uncategorized'
    },
    content : {
        type : String,
    },
    slug : {
        type : String,
        required : true,
        unique : true
    }
}, {timestamps : true});

const Post = mongoose.model('Post', postSchema);

export default Post;