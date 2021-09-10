import upload from "../middlewares/upload.js"
import express from "express"
import mongoose from "mongoose";
import Grid from "gridfs-stream"
const router = express.Router();

let gfs;

const conn = mongoose.connection;
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("images");
})

router.post('/', (req, res) => {
    // console.log(req.file.filename)
    console.log(req.body)
    res.send(req.body.filename)
})

router.post("/upload", upload.single("file"), async (req, res) => {

    if (req.file === undefined) return res.send("you must select a file.")

    console.log(req.file.filename)
    return res.send(req.file.filename)
});

// media routes
router.get("/retrieve", async (req, res) => {
    // console.log(req.query)
    try {
        const file = await gfs.files.findOne({ filename: req.query.filename });
        const readStream = gfs.createReadStream(file.filename);
        // readStream.on('data', (chunk) => {
        //     res.render('newHandlebarFile', { image: chunk.toString('base64') });
        // })
        readStream.pipe(res);
    } catch (error) {
        res.send("Image not found");
    }
})

router.delete("/delete/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

export default router
