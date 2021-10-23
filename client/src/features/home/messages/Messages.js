import React, {useState} from "react"
import './Messages.css'
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {cleanDiscussion, selectDiscussions} from "./messagesSlice";
import {getImage} from "../../../ServerInstance";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

export const Messages = () => {

    const dispatch = useDispatch()
    const discussions = useSelector(selectDiscussions)

    const [message, setMessage] = useState('')

    const handleSendMessage = (e) => {
        e.preventDefault()
    }

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
                                    d.messages !== null && d.messages.length !== 0 ?
                                        d.messages.map(msg => (
                                            <div className={'messages__discussion__main__msg'}>
                                                {msg.message}
                                            </div>
                                        ))
                                        :
                                        ''
                                }
                            </div>
                            <form className={'messages__discussion__form'}>
                                <FormControl className={'messages__discussion__form__control'}>
                                    <input className={'messages__discussion__form__control__input'} placeholder="Message"/>
                                    <IconButton type={'submit'}
                                                onClick={handleSendMessage}

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