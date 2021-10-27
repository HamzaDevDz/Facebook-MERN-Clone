import express from "express"
import mongoMessages from "../models/mongoMessages.js";
import mongoUsers from "../models/mongoUsers.js";
import {ObjectId} from 'mongodb';
const router = express.Router();

router.post('/getDiscussion',  async (req, res)=>{
    console.log(req.body)
    await mongoMessages.findOneAndUpdate(
        {},
        {
            $setOnInsert: {
                idUsers: [req.body.idUser1, req.body.idUser2],
                users:[
                    {
                        idUser: req.body.idUser1,
                        saw: 0
                    },
                    {
                        idUser: req.body.idUser2,
                        saw: 0
                    }
                ],
                messages: []
            }
        },
        {
            new: true,
            upsert: true,
            rawResult: true,
            arrayFilters:[
                {'users.idUser': {$in: [req.body.idUser1, req.body.idUser2]}}
            ]
        }
    ).then(data => {
        // console.log(data)
        mongoUsers.findOne(
            {_id: req.body.idUser2}
        ).then(result => {
            const clientResult = {
                friend: {
                    id: result._id,
                    name: result.name,
                    firstName: result.firstName,
                    imgUserName: result.imgUserName
                },
                messages: data.value,
            }
            // console.log(clientResult)
            res.send(clientResult).status(200)
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.post('/addMessage', (req, res) => {
    mongoMessages.findOneAndUpdate(
        {_id: ObjectId(req.body.idMessages)},
        {
            $push:{
                'messages': req.body.message
            }
        }
    ).then(data => {
        // console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post('/synchMessages', (req, res) => {
    mongoMessages.findOne(
        {},
        {},
        {
            arrayFilters:[
                {'users.idUser': {$in: [req.body.idUser1, req.body.idUser2]}}
            ]
        }
    ).then(data => {
        // console.log(data)
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

export default router