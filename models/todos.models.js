import mongoose from "mongoose";
import TodoSchema from "../utils/TodoSchema.js";


const TodoModel = mongoose.model('todos', TodoSchema)


export const getTodoDB = () => {
    return TodoModel.find()
}

export const createTodoDB = (body) => {
    return TodoModel.create(body)
}

export const findTodoById = (id) => {
    return TodoModel.findById({ $eq: id })
}

export const deleteTodoDB = (id) => {
    return TodoModel.deleteOne({ _id: id })
}
