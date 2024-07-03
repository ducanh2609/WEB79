import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    checked: {
        type: Number,
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

export default TodoSchema