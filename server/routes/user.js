import express from "express"
import mongoUsers from "../models/mongoUsers.js";
import {ObjectId} from 'mongodb';
const router = express.Router();

router.post('/upload', (req, res) => {
    const dbUser = req.body
    mongoUsers.create(dbUser, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

router.post('/retrieve', (req, res)=>{
    // console.log(req)
    mongoUsers.findOne({username: req.body.username},(err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            if(!data || data.length === 0){
                res.status(404).json({err: 'User not found'})
            }
            else{
                if(data.password !== req.body.password){
                    res.status(403).json({err: 'Incorrect password'})
                }
                res.status(200).send(data)
            }
        }
    })
})

router.post('/search', (req, res)=>{
    const search = req.body.search
    const idUser = req.body.idUser
    // console.log(search)
    // console.log(idUser)
    const Value_match = new RegExp('^'+search,'i');
    // console.log(Value_match)
    mongoUsers
        .aggregate([
            {
                $match:
                    {
                        $or:[
                            {name: {$regex: Value_match}},
                            {firstName: {$regex: Value_match}},
                            {username: {$regex: Value_match}}
                            ],
                        _id : {$ne: ObjectId(idUser)}
                    }
        }])
        .exec((err, data) => {
            res.send(data)
    })
})

router.post('/invite', (req, res)=>{
    // console.log(req)
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idRequest)},
        {
            $push:{
                idRequests: ObjectId(req.body.idUser)
            }
        }
    ).then(data => {
        // console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/disinvite', (req, res)=>{
    // console.log(req)
    // console.log(req.body)
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idRequest)},
        {
            $pull:{
                idRequests: ObjectId(req.body.idUser)
            }
        }
    ).then(data => {
        // console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/synchronisation', (req, res)=>{
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idUser)},
    ).then(data => {
        // console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/get', (req, res)=>{
    // console.log(req.query)
    mongoUsers.findOne(
        {_id: ObjectId(req.query.idUser)},
    ).then(data => {
        // console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/requesters', (req, res)=>{
    const myIdUser = req.body.myIdUser
    mongoUsers.findOne(
        {_id: ObjectId(myIdUser)},
    ).then(data => {
        // res.send(data).status(200)
        // console.log(data.idRequests)
        let idbRequestObject = []
        data.idRequests.forEach(idRequest => {
            idbRequestObject.push(ObjectId(idRequest))
        })
        mongoUsers.find(
                {_id: {$all : idbRequestObject}},
            ).then(data => {
                res.send(data)
            })
            .catch(err => {
                return 'error'
            })
        }).catch(err => {
        return 'error'
    })
})

router.post('/addFriend', (req, res)=>{
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idUser)},
        {
            $push:{
                idFriends: req.body.idRequest
            },
            $pull:{
                idRequests: req.body.idRequest
            }
        }
    ).then(data => {
        // console.log(data)
        // res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idRequest)},
        {
            $push:{
                idFriends: req.body.idUser
            },
            $pull:{
                idRequests: req.body.idUser
            }
        }
    ).then(data => {
        // console.log(data)
        // res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/refuseFriend', (req, res)=>{
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idUser)},
        {
            $pull:{
                idRequests: req.body.idRequest
            }
        }
    ).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/removeFriend', (req, res)=>{
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idUser)},
        {
            $pull:{
                idRequests: req.body.idFriend
            }
        }
    ).catch(err => {
        res.status(500).send(err)
    })
    mongoUsers.findOneAndUpdate(
        {_id: ObjectId(req.body.idFriend)},
        {
            $pull:{
                idRequests: req.body.idFriend
            }
        }
    ).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/getFriends', (req, res)=>{
    mongoUsers.findOne(
        {_id: ObjectId(req.body.myIdUser)},
    ).then(data => {
        let idbFriendsObject = []
        data.idFriends.forEach(idFriend => {
            idbFriendsObject.push(ObjectId(idFriend))
        })
        mongoUsers.find(
            {_id: {$all : idbFriendsObject}},
        ).then(data => {
            res.send(data)
        })
            .catch(err => {
                return 'error'
            })
    }).catch(err => {
        return 'error'
    })
})

export default router

// module.exports = router;