import express from "express"
import mongoPosts from "../models/mongoPosts.js";
const router = express.Router();

router.post('/upload', (req, res)=>{
    const dbPost = req.body
    mongoPosts.create(dbPost, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

router.post('/getPosts', (req, res)=>{
    // mongoPosts.find((err, data)=>{
    //     if(err){
    //         res.status(500).send(err)
    //     }
    //     else{
    //         data.sort((b, a)=>{
    //             return a.timestamp - b.timestamp
    //         })
    //         res.status(200).send(data)
    //     }
    // })
    mongoPosts.find(
        {idUser: {$in: [req.body.idUser, req.body.idFriends]}},
        // {$or: [{idUser: {$in: req.body.idFriends}}, {idUser: req.body.idUser}]},
    ).then(data => {
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
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

router.post('/comment/like', (req, res) => {
    const idPost = req.body.idPost
    const idComment = req.body.idComment
    const username = req.body.username
    console.log(idPost)
    console.log(idComment)
    console.log(username)
    mongoPosts.findOneAndUpdate(
        {_id: idPost},
        {
            $push:{
                'comments.$[filter].likes': username
            }
        },
    {
        arrayFilters: [
            {
                'filter._id': idComment
            }
        ]
    }
    ).then(data => {
        console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/comment/dislike', (req, res) => {
    const idPost = req.body.idPost
    const idComment = req.body.idComment
    const username = req.body.username
    mongoPosts.findOneAndUpdate(
        {_id: idPost},
        {
            $pull:{
                'comments.$[filter].likes': username
            }
        },
        {
            arrayFilters: [
                {
                    'filter._id': idComment
                }
            ]
        }
    ).then(data => {
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

export default router