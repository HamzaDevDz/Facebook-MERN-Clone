import express from "express"
import mongoPosts from "../models/mongoPosts.js";
const router = express.Router();

router.post('/upload/', (req, res)=>{
    const dbPost = req.body
    console.log(dbPost)
    mongoPosts.create(dbPost, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

router.get('/retrieve', (req, res)=>{
    mongoPosts.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            data.sort((b, a)=>{
                return a.timestamp - b.timestamp
            })
            res.status(200).send(data)
        }
    })
})

export default router

// module.exports = router;