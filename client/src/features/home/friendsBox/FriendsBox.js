import React, {useEffect} from "react"
import './FriendsBox.css'
import {useDispatch, useSelector} from "react-redux";
import {selectFriends} from "./friendsBoxSlice.js";
import {selectUser} from "../../login/loginSlice";
import {getFriends} from "./friendsBoxSlice";
import {getImage} from "../../../ServerInstance";
import Avatar from "@mui/material/Avatar";

export const FriendsBox = () => {

    const dispatch = useDispatch()

    const friends = useSelector(selectFriends)
    const user = useSelector(selectUser)

    useEffect(() => {
        if(user !== null){
            dispatch(getFriends({myIdUser: user._id}))
        }
    }, [])

    return(
        <div className={'friendsBox'}>
            {
                friends.length !== 0 ?
                    friends.map(friend => (
                        <div className={'friendsBox__friend'}>
                            <Avatar src={getImage(friend.imgUserName)} alt={friend.username[0].toUpperCase()}
                                    className={'friendsBox__friend__avatar'}
                            />
                            {friend.name} {friend.firstName}
                        </div>
                    ))
                    :
                    ''
            }
        </div>
    )
}