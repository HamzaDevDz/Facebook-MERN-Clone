import express from "express"
import mongoUsers from "../models/mongoUsers.js";
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

router.get('/search', (req, res)=>{
    console.log(req.query.search)
    const search = req.query.search
    // $or : [
    //     {name: {$regex: '/*'+search+'*/'}, $option: 'is'},
    //     {firstName: {$regex: '/*'+search+'*/'}, $option: 'is'}
    // ]
    mongoUsers.find({
            name: {$in: [/^search^/]}
    },
        (err, data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            if(!data || data.length === 0){
                res.status(404).json({err: 'Users not found'})
            }
            else{
                console.log(data)
                res.status(200).send(data)
            }
        }
    })
})

export default router

// module.exports = router;