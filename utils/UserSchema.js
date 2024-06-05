import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
})

UserSchema.path('username').validate((value) => {
    if (value.length < 8) {
        this.invalidate('username', 'Username phải lớn 8 kí tự')
    }
    return true
})


export default UserSchema
