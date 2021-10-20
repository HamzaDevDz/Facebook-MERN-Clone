import mongoose from 'mongoose'

const messageModel = mongoose.Schema({
    idUsers: [String],
    messages: [{
        message: String,
        timestamp: Number,
        idUser: String,
        likes: [String]
    }]
})

export default mongoose.model('messages', messageModel)