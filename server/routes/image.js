import express from "express"
import mongoImages from "../models/mongoImages.js";
import multer from "multer";
const router = express.Router();

// Set up multer for storing uploaded files --------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send('Coucouc')
})

router.get('/retrieve', (req, res) => {
    mongoImages.findOne({name: req.params.name}, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else if(!item || item.length === 0){
            res.status(404).json({err: 'file not found'})
        }
        else {
            res.render('imagesPage', { items: item });
        }
    });
})

router.post('upload', upload.single('image'), (req, res, next) => {
    const obj = {
        // name: req.body.name,
        filename: `image-${Date.now()}${path.extname(req.file.filename)}`,
        // desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    mongoImages.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            // res.redirect('/');
            res.send(item)
        }
    });
})

export default router

// module.exports = router