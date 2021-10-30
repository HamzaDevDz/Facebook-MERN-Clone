import React, {useEffect, useState} from "react"
import './Messages.css'
import {useDispatch, useSelector} from "react-redux";
import {
    resetStatusUpDateDiscussions,
    selectDiscussions,
    selectStatusUpDateDiscussions,
    synchMessages
} from "./messagesSlice";
import {selectUser} from "../../login/loginSlice";
import {pusher} from "../../../ServerInstance";
import {Discussion} from "./discussion/Discussion";

export const Messages = () => {

    const dispatch = useDispatch()
    const discussions = useSelector(selectDiscussions)
    const statusUpDateDiscussions = useSelector(selectStatusUpDateDiscussions)

    const [statusSynchServer, setStatusSynchServer] = useState(false)

    const user = useSelector(selectUser)

    useEffect(()=>{
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
            console.log('Inserted messages')
            setStatusSynchServer(true)
        })
        channel.bind('updated', function(data) {
            console.log('Update messages')
            setStatusSynchServer(true)
        })
    }, [])

    useEffect(()=>{
        // console.log(discussions)
        discussions.forEach((d,i) => {
            const idUsers = {
                idUser1 : user._id,
                idUser2 : d.friend.id
            }
            dispatch(synchMessages(idUsers))
        })
        setStatusSynchServer(false)
    }, [statusSynchServer])

    useEffect(()=>{
        const mainElements = document.querySelectorAll('.messages__discussion__main')
        if(mainElements !== null){
            mainElements.forEach(mainElem => {
                mainElem.scrollTop = mainElem.scrollHeight
            })
        }
        dispatch(resetStatusUpDateDiscussions())
    }, [statusUpDateDiscussions])

    return(
        <div className={'messages'}>
            {
                discussions.length !== 0 ?
                    discussions.map((d, i) => (
                        <Discussion friend={d.friend} messages={d.messages} index={i} />
                    ))
                    :
                    ''
            }
        </div>
    )
}