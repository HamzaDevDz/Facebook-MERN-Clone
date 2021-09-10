import mongoose from "mongoose";

const userModel = mongoose.Schema({
    name: String,
    firstName: String,
    email: String,
    phone: String,
    imgUserName: String,
    username: String,
    password: String
})

export default mongoose.model('users', userModel)