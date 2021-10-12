import mongoose from 'mongoose'

const messageModel = mongoose.Schema({
    idUsers: [String],
    message: String,
    likes: Number,
    timestamp: Number
})

// 1st param : name of collection
export default mongoose.model('messages', messageModel)