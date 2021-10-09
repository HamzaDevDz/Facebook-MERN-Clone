import express from "express"
import mongoPosts from "../models/mongoPosts.js";
const router = express.Router();

router.post('/upload', (req, res)=>{
    const dbPost = req.body
    // console.log(dbPost)
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

router.post('/comment/upload', (req, res)=>{
    const newComment = req.body
    console.log(newComment)
    mongoPosts.findOneAndUpdate(
        {_id: newComment.idPost},
        {
            $push:{
                comments: newComment.comment
            }
        }
    ).then(data => {
        console.log('comment added')
        res.send(data).status(200)
    }).catch(err => {
        console.log('comment not added')
        res.status(500).send(err)
    })
})

router.post('/like', (req, res) => {
    const idPost = req.body.idPost
    const username = req.body.username
    mongoPosts.findOneAndUpdate(
        {_id: idPost},
        {
            $push:{
                likes: username
            }
        }
    ).then(data => {
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/dislike', (req, res) => {
    const idPost = req.body.idPost
    const username = req.body.username
    mongoPosts.findOneAndUpdate(
        {_id: idPost},
        {
            $pull:{
                likes: username
            }
        }
    ).then(data => {
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

export default router