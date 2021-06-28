import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userTokenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("user", userSchema)
const UserToken = mongoose.model("userToken", userTokenSchema)

export {User, UserToken};
