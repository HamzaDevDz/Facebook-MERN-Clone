import mongoose from "mongoose"
import Pusher from "pusher"

// const mongoURI = 'mongodb+srv://admin:WtxCs81u5oLnynRw@cluster0.otzak.mongodb.net/fbdb?retryWrites=true&w=majority&ssl=true'
const mongoURI = 'mongodb://admin:WtxCs81u5oLnynRw@cluster0-shard-00-00.otzak.mongodb.net:27017,cluster0-shard-00-01.otzak.mongodb.net:27017,cluster0-shard-00-02.otzak.mongodb.net:27017/fbdb?ssl=true&replicaSet=atlas-6cn4r8-shard-0&authSource=admin&retryWrites=true&w=majority'

const pusher = new Pusher({
    appId: "1268564",
    key: "67843c3bf2c33b4e1d28",
    secret: "e06265628e3ac531171d",
    cluster: "eu",
    useTLS: true
});

const connexion = async () => {
    try {
        mongoose.connection.once('open', ()=>{
            const changeStreamPosts = mongoose.connection.collection('posts').watch()
            changeStreamPosts.on('change', change => {
                if(change.operationType === 'insert'){
                    pusher.trigger('posts', 'inserted', {
                        change: change
                    })
                }
                if(change.operationType === 'update'){
                    pusher.trigger('posts', 'updated', {
                        change: change
                    })
                }
                else{
                    console.log('Posts : Error triggering Pusher')
                }
            })
            const changeStreamUsers = mongoose.connection.collection('users').watch()
            changeStreamPosts.on('change', change => {
                if(change.operationType === 'insert'){
                    console.log('users updated Server')
                    pusher.trigger('users', 'inserted', {
                        change: change
                    })
                }
                else{
                    console.log('Users : Error triggering Pusher')
                }
                if(change.operationType === 'update'){
                    console.log('users updated Server')
                    pusher.trigger('users', 'updated', {
                        change: change
                    })
                }
                else{
                    console.log('Users : Error triggering Pusher')
                }
            })
        })
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(mongoURI, connectionParams);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
}

export default connexion