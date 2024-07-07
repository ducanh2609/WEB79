import mongoose from "mongoose";
import ChatSchema from "../utils/ChatSchema.js";


const ChatModel = mongoose.model('chats', ChatSchema)


export const createChatDB = (body) => {
    return ChatModel.create(body)
}

export const findChat = () => {
    return ChatModel.find()
}