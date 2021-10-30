import React, {useEffect, useState} from "react"
import './Discussion.css'
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../../login/loginSlice";
import Avatar from "@mui/material/Avatar";
import {getImage} from "../../../../ServerInstance";
import IconButton from "@mui/material/IconButton";
import {addMessage, cleanDiscussion, resetSaw, selectSawMessages} from "../messagesSlice";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import Badge from "@mui/material/Badge";
import MailIcon from '@mui/icons-material/Mail';

export const Discussion = ({friend, messages, index}) => {

    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const saw = useSelector(selectSawMessages(friend.id))
    const [message, setMessage] = useState('')
    const [reduced, setReduced] = useState(false)

    useEffect(()=>{
        if(saw !== 0){
            if(!reduced){
                dispatch(resetSaw({idMessages: messages._id, idUser: user._id}))
            }
        }
    }, [reduced])

    return(
        <div key={'discussion-'+friend.id+'-'+user._id} className={'messages__discussion'}>
            <div className={'messages__discussion__information'} onClick={()=>{
                if(reduced){
                    setReduced(false)
                }else{
                    setReduced(true)
                }
            }}>
                <Avatar src={getImage(friend.imgUserName)} alt={friend.name[0].toUpperCase()}
                        className={'messages__discussion__information__avatar'}
                />
                {friend.firstName} {friend.name}
                {
                    saw !== 0 ?
                        <Badge badgeContent={saw}
                               color="success"
                               className={'messages__discussion__information__avatar__noneSaw'}
                               anchorOrigin={{
                                   vertical: 'top',
                                   horizontal: 'left',
                               }}
                        >
                            <MailIcon color="action" />
                        </Badge>
                        :
                        ''
                }
                <IconButton className={'messages__discussion__information__exit'}
                            color="success"
                            onClick={()=>{
                                dispatch(cleanDiscussion(index))
                            }}
                >
                    <HighlightOffRoundedIcon></HighlightOffRoundedIcon>
                </IconButton>
            </div>
            {
                !reduced ?
                    <div className={'messages__discussion__main'}>
                        {
                            messages !== null && messages.length !== 0 ?
                                messages.messages.map(msg => (
                                    msg.idUser === user._id ?
                                        <div key={'msg-' + msg._id}
                                             className={'messages__discussion__main__msg messages__discussion__main__myMsg'}>
                                            {msg.message}
                                        </div>
                                        :
                                        <div key={'msg-' + msg._id}
                                             className={'messages__discussion__main__msg messages__discussion__main__friendMsg'}>
                                            {msg.message}
                                        </div>
                                ))
                                :
                                ''
                        }
                    </div>
                    :
                    ''
            }
            {
                !reduced ?
                    <form className={'messages__discussion__form'}>
                        <FormControl className={'messages__discussion__form__control'}>
                            <input className={'messages__discussion__form__control__input'} placeholder="Message"
                                   value={message}
                                   onChange={e => setMessage(e.target.value)}
                                   type={'text'}
                                   autoFocus
                            />
                            <IconButton type={'submit'}
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            const newMessage = {
                                                idMessages : messages._id,
                                                message : {
                                                    message: message,
                                                    timestamp: Date.now(),
                                                    idUser: user._id,
                                                    likes: []
                                                },
                                            }
                                            dispatch(addMessage(newMessage))
                                            setMessage('')
                                        }}
                                        color={'primary'}
                                        disabled={!message}
                                        className={'messages__discussion__form__control__btn'}>
                                <SendIcon></SendIcon>
                            </IconButton>
                        </FormControl>
                    </form>
                    :
                    ''
            }

        </div>

        )
}