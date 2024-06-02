import mongoose from "mongoose"
import UserSchema from "../ultis/UserSchema.js"

const UserModel = mongoose.model('users', UserSchema)

export const getAllUserDB = () => {
    return UserModel.find()
}

export const getOneUserDB = (id) => {
    return UserModel.findById(id)
}

export const findOneUser = (condition) => {
    return UserModel.findOne(condition)
}

export const createUser = (body) => {
    return UserModel.create(body)
}