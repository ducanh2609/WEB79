import mongoose from "mongoose"
import UserSchema from "../utils/UserSchema.js"

const UserModel = mongoose.model('users', UserSchema)

export const getAllUserDB = (skip, limit) => {
    return UserModel.find().skip(skip).limit(limit).sort({ username: -1 })
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

export default UserModel