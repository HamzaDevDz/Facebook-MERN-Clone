import mongoose from 'mongoose'

// const postModel = mongoose.Schema({
//     username: String,
//     imgUser: String,
//     caption: String,
//     imgPost: String,
//     mood: String,
//     likes: [String],
//     comments: [{
//         username: String,
//         imgUserName: String,
//         text: String,
//         timestamp: Number,
//         likes: [String]
//     }],
//     timestamp: Number
// })

const postModel = mongoose.Schema({
    iUser: String,
    username: String,
    imgUserName: String,
    caption: String,
    imgPost: String,
    mood: String,
    likes: [String],
    comments: [{
        username: String,
        imgUserName: String,
        text: String,
        timestamp: Number,
        likes: [String]
    }],
    timestamp: Number
})

// 1st param : name of collection
export default mongoose.model('posts', postModel)