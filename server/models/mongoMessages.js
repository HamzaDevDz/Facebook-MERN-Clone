import mongoose from 'mongoose'

// const messageModel = mongoose.Schema({
//     idUsers: [String],
//     users: [{
//         idUser: String,
//         saw: Number
//     }],
//     messages: [{
//         message: String,
//         timestamp: Number,
//         idUser: String,
//         likes: [String]
//     }]
// })

const messageModel = mongoose.Schema({
    users: [{
        idUser: String,
        saw: Number
    }],
    messages: [{
        message: String,
        timestamp: Number,
        idUser: String,
        likes: [String]
    }]
})

export default mongoose.model('messages', messageModel)