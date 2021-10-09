import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import path from "path";

// const mongoURI = 'mongodb+srv://admin:WtxCs81u5oLnynRw@cluster0.otzak.mongodb.net/fbdb?retryWrites=true&w=majority'
const mongoURI = 'mongodb://admin:WtxCs81u5oLnynRw@cluster0-shard-00-00.otzak.mongodb.net:27017,cluster0-shard-00-01.otzak.mongodb.net:27017,cluster0-shard-00-02.otzak.mongodb.net:27017/fbdb?ssl=true&replicaSet=atlas-6cn4r8-shard-0&authSource=admin&retryWrites=true&w=majority'

const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `image-${Date.now()}${path.extname(file.originalname)}`
        }

        return {
            bucketName: "images",
            filename: `image-${Date.now()}${path.extname(file.originalname)}`
        };
    },
})

const upload = multer({ storage })
export default upload
