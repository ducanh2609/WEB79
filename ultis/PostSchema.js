import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
    },
    content: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
})

export default PostSchema