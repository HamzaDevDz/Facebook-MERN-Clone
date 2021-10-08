// importing stuff --------------------------------------------------------------------------------------------
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import Pusher from "pusher"
import connexion from "./db.js"
import post from "./routes/post.js"
import user from "./routes/user.js"
import upload from "./routes/upload.js"

// app config --------------------------------------------------------------------------------------------
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1268564",
    key: "67843c3bf2c33b4e1d28",
    secret: "e06265628e3ac531171d",
    cluster: "eu",
    useTLS: true
})

// middlewares --------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// db config --------------------------------------------------------------------------------------------
connexion()

// api routes --------------------------------------------------------------------------------------------
app.get('/', (req, res)=>res.status(200).send('Hello world'))

app.use("/post", post)
app.use("/user", user)
app.use("/image", upload)

// listner --------------------------------------------------------------------------------------------
app.listen(port, ()=>console.log('listening on localhost : ' + port))