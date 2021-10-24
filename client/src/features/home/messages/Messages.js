import React, {useEffect, useState} from "react"
import './Messages.css'
import FormControl from "@mui/material/FormControl";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, cleanDiscussion, selectDiscussions, synchMessages} from "./messagesSlice";
import {getImage} from "../../../ServerInstance";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {selectUser} from "../../login/loginSlice";
import Pusher from 'pusher-js'

const pusher = new Pusher('67843c3bf2c33b4e1d28', {
    cluster: 'eu'
});

export const Messages = () => {

    const dispatch = useDispatch()
    const discussions = useSelector(selectDiscussions)

    const [message, setMessage] = useState('')

    const user = useSelector(selectUser)

    useEffect(()=>{
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
            if(discussions.length !== 0){
                discussions.forEach((d,i) => {
                    const idUsers = {
                        idUser1 : user._id,
                        idUser2 : d.friend.id
                    }
                    dispatch(synchMessages(idUsers))
                })
            }
        })
        channel.bind('updated', function(data) {
            console.log('haw ki')
            discussions.forEach((d,i) => {
                const idUsers = {
                    idUser1 : user._id,
                    idUser2 : d.friend.id
                }
                dispatch(synchMessages(idUsers))
            })
        })
    }, [])

    return(
        <div className={'messages'}>
            {
                discussions.length !== 0 ?
                    discussions.map((d, i) => (
                        <div className={'messages__discussion'}>
                            <div className={'messages__discussion__information'}>
                                <Avatar src={getImage(d.friend.imgUserName)} alt={d.friend.name[0].toUpperCase()}
                                        className={'messages__discussion__information__avatar'}
                                />
                                {d.friend.firstName} {d.friend.name}
                                <IconButton className={'messages__discussion__information__exit'}
                                            color="success"
                                            onClick={()=>{
                                                dispatch(cleanDiscussion(i))
                                            }}
                                >
                                    <HighlightOffRoundedIcon></HighlightOffRoundedIcon>
                                </IconButton>
                            </div>
                            <div className={'messages__discussion__main'}>
                                {
                                    d.messages !== null && d.messages.messages.length !== 0 ?
                                        d.messages.messages.map(msg =>(
                                            msg.idUser === user._id ?
                                                <div key={'msg-'+d.messages.messages._id} className={'messages__discussion__main__msg messages__discussion__main__myMsg'}>
                                                    {msg.message}
                                                </div>
                                                :
                                                <div key={'msg-'+d.messages.messages._id} className={'messages__discussion__main__msg messages__discussion__main__friendMsg'}>
                                                    {msg.message}
                                                </div>
                                        ))
                                        :
                                        ''
                                }
                            </div>
                            <form className={'messages__discussion__form'}>
                                <FormControl className={'messages__discussion__form__control'}>
                                    <input className={'messages__discussion__form__control__input'} placeholder="Message"
                                           value={message}
                                           onChange={e => setMessage(e.target.value)}/>
                                    <IconButton type={'submit'}
                                                onClick={(e)=>{
                                                    e.preventDefault()
                                                    const newMessage = {
                                                        idMessages : d.messages._id,
                                                        message : {
                                                            message: message,
                                                            timestamp: Date.now(),
                                                            idUser: user._id,
                                                            likes: []
                                                        }
                                                    }
                                                    dispatch(addMessage(newMessage))
                                                    setMessage('')
                                                    const mainElem = e.target.parentNode.parentNode.parentNode.querySelector('.messages__discussion__main')
                                                    mainElem.scrollTop = mainElem.scrollHeight
                                                }}
                                                color={'primary'}
                                                disabled={!message}
                                                className={'messages__discussion__form__control__btn'}>
                                        <SendIcon></SendIcon>
                                    </IconButton>
                                </FormControl>
                            </form>
                        </div>
                    ))
                    :
                    ''
            }
        </div>
    )
}