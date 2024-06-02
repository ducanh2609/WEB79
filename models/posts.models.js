import mongoose from "mongoose";
import PostSchema from "../ultis/PostSchema.js";


const PostModel = mongoose.model('posts', PostSchema)


export const createPostDB = (body) => {
    return PostModel.create(body)
}

export const findPostById = (id) => {
    return PostModel.findById(id)
}
