import express from "express"
import mongoMessages from "../models/mongoMessages.js";
const router = express.Router();

router.post('/retrieve', (req, res)=>{
    mongoMessages.findOne(
        {idUsers: [req.body.idUser1, req.body.idUser2]},
    ).then(data => {
        res.send(data).status(200)
    }).catch(err => {
        res.status(500).send(err)
    })
})

export default router