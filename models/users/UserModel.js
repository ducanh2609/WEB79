import mongoose from "mongoose"
import UserSchema from "./UserSchema.js"

const UserModel = mongoose.model('users', UserSchema)

export default UserModel