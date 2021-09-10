// importing stuff --------------------------------------------------------------------------------------------
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import Pusher from "pusher"
import connexion from "./db.js"
import post from "./routes/post.js"
import user from "./routes/user.js"
import upload from "./routes/upload.js"

// require("dotenv.config()");
// Grid.mongo = mongoose.mongo

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

app.post('/image', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.use("/post", post)
app.use("/user", user)

app.use("/image", upload)


// listner --------------------------------------------------------------------------------------------
app.listen(port, ()=>console.log('listening on localhost : ' + port))

// let gfs;
// const conn = mongoose.connection;
// conn.once("open", function () {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("images");
// });

// const mongoURI = 'mongodb+srv://admin:WtxCs81u5oLnynRw@cluster0.otzak.mongodb.net/fbdb?retryWrites=true&w=majority'
//
// const conn = mongoose.createConnection(mongoURI,{
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// mongoose.connect(mongoURI,{
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// mongoose.connection.once('open', ()=>{
//     console.log('DB Connected')
// })



// let gfs
// conn.once('open', ()=>{
//     console.log('DB Connected')
//     // config the stream : db and driver of mongodb
//     gfs = Grid(conn.db, mongoose.mongo)
//     gfs.collection('images')
// })

// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file)=>{
//         return new Promise((resolve, reject)=>{
//             const filename = `image-${Date.now()}${path.extname(file.originalname)}`
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'images'
//             }
//             resolve(fileInfo)
//         })
//     }
// })

// const upload = multer({ storage })


// app.use("/image", upload)
//
// app.get("/image/:filename", async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     } catch (error) {
//         res.send("not found");
//     }
// });
//
// app.delete("/image/:filename", async (req, res) => {
//     try {
//         await gfs.files.deleteOne({ filename: req.params.filename });
//         res.send("success");
//     } catch (error) {
//         console.log(error);
//         res.send("An error occured.");
//     }
// });

// app.post('/upload/image', upload.single('file'), (req, res)=>{
//     // console.log(req.file)
//     res.status(201).send(req.file)
//     console.log('Upload success')
// })



// app.post('/retrieve/image/single', (req, res)=>{
//     gfs.files.findOne({filename: req.body.filename}, (err, file)=>{
//         if(err){
//             res.status(500).send(err)
//         }
//         else{
//             if(!file || file.length === 0){
//                 res.status(404).json({err: 'file not found'})
//             }
//             else{
//                 const readstream = gfs.createReadStream(file.filename)
//                 readstream.pipe(res)
//                 // res.send('success')
//             }
//         }
//     })
// })
