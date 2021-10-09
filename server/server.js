// importing stuff --------------------------------------------------------------------------------------------
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import connexion from "./db.js"
import post from "./routes/post.js"
import user from "./routes/user.js"
import upload from "./routes/upload.js"

// app config --------------------------------------------------------------------------------------------
const app = express()
const port = process.env.PORT || 9000

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