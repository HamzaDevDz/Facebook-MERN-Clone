import React, {useEffect} from "react"
import './Friends.css'
import {useDispatch, useSelector} from "react-redux";
import {selectFriends} from "./friendsSlice.js";
import {selectUser} from "../../login/loginSlice";
import {getFriends} from "./friendsSlice";
import {Friend} from "./friend/Friend";

export const Friends = () => {

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
                        <Friend key={friend._id} friend={friend} idUser={user._id} />
                    ))
                    :
                    <div className={'friendsBox__noFriends'}>
                        No friends yet
                    </div>
            }
        </div>
    )
}