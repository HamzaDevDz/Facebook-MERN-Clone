import React, {useEffect} from "react"
import './FriendsBox.css'
import {useDispatch, useSelector} from "react-redux";
import {selectFriends} from "./friendsBoxSlice.js";
import {selectUser} from "../../login/loginSlice";
import {getFriends} from "./friendsBoxSlice";
import {getImage} from "../../../ServerInstance";
import Avatar from "@mui/material/Avatar";
import {getDiscussion} from "../messages/messagesSlice";

export const FriendsBox = () => {

    const dispatch = useDispatch()

    const friends = useSelector(selectFriends)
    const user = useSelector(selectUser)

    useEffect(() => {
        if (user !== null) {
            dispatch(getFriends({myIdUser: user._id}))
        }
    }, [])

    return (
        <div className={'friendsBox'}>
            <p className={'friendsBox__title'}>
                Contacts
            </p>
            {
                friends.length !== 0 ?
                    friends.map(friend => (
                        <div className={'friendsBox__friend'}
                             onClick={() => {
                                 console.log('getDiscussion !')
                                 dispatch(getDiscussion(
                                     {
                                         idUser1: user._id,
                                         idUser2: friend._id
                                     }))
                             }}
                        >
                            <Avatar src={getImage(friend.imgUserName)} alt={friend.username[0].toUpperCase()}
                                    className={'friendsBox__friend__avatar'}
                            />
                            {friend.name} {friend.firstName}
                        </div>
                    ))
                    :
                    <div className={'friendsBox__noFriends'}>
                        No friends yet
                    </div>
            }
        </div>
    )
}