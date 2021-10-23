import express from "express"
import mongoMessages from "../models/mongoMessages.js";
import mongoUsers from "../models/mongoUsers.js";
const router = express.Router();

router.post('/getDiscussion', (req, res)=>{
    mongoMessages.findOneAndUpdate(
        {idUsers: [req.body.idUser1, req.body.idUser2]},
            {
                $setOnInsert: {
                    idUsers: [req.body.idUser1, req.body.idUser2],
                    messages: []
                }
            },
        {
            returnNewDocument: false,
            upsert: true
        }
    ).then(data => {
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
                messages: data.messages
            }
            // console.log(clientResult)
            res.send(clientResult).status(200)
        })
    }).catch(err => {
        res.status(500).send(err)
    })
})

export default router