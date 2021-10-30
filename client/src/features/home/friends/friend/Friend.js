import React from "react"
import "./Friend.css"
import {getDiscussion, selectSawMessages} from "../../messages/messagesSlice";
import Avatar from "@mui/material/Avatar";
import {getImage} from "../../../../ServerInstance";
import {useDispatch} from "react-redux";

export const Friend = ({friend, idUser}) => {

    const dispatch = useDispatch()

    return (
        <div className={'friend'}
            onClick={() => {
            dispatch(getDiscussion(
                {
                    idUser1: idUser,
                    idUser2: friend._id
                }))
        }}
            >
            <Avatar src={getImage(friend.imgUserName)} alt={friend.username[0].toUpperCase()}
                    className={'friend__avatar'}
            />
            <span className={'friend__text'}>{friend.name} {friend.firstName}</span>
        </div>
    )
}