import mongoose from "mongoose"

const mongoURI = 'mongodb+srv://admin:WtxCs81u5oLnynRw@cluster0.otzak.mongodb.net/fbdb?retryWrites=true&w=majority'

const connexion = async () => {
    try {
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