import mongoose from "mongoose"
import Pusher from "pusher"

const mongoURI = 'mongodb+srv://admin:WtxCs81u5oLnynRw@cluster0.otzak.mongodb.net/fbdb?retryWrites=true&w=majority'

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
            const changeStream = mongoose.connection.collection('posts').watch()
            changeStream.on('change', change => {
                if(change.operationType === 'insert'){
                    pusher.trigger('posts', 'inserted', {
                        change: change
                    })
                }
                else{
                    console.log('Error triggering Pusher')
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