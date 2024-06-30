import mongoose from "mongoose";
import FileSchema from "../utils/FIleSchema.js";


const FileModel = mongoose.model('files', FileSchema)


export const createFile = (body) => {
    return FileModel.create(body)
}

export const findFile = (userId) => {
    return FileModel.find(userId)
}