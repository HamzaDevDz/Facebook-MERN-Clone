import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import path from "path";

const mongoURI = 'mongodb+srv://admin:WtxCs81u5oLnynRw@cluster0.otzak.mongodb.net/fbdb?retryWrites=true&w=majority'

const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            return filename;
        }

        return {
            bucketName: "images",
            filename: `image-${Date.now()}${path.extname(file.originalname)}`
        };
    },
});
const upload = multer({ storage })
export default upload
// module.exports = multer({ storage });