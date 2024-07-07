import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default ChatSchema