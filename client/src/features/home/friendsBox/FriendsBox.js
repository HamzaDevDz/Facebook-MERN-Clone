import React, {useEffect} from "react"
import './FriendsBox.css'
import {useDispatch, useSelector} from "react-redux";
import {selectFriends} from "./friendsBoxSlice.js";
import {selectUser} from "../../login/loginSlice";
import {getFriends} from "./friendsBoxSlice";

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
                            {friend.name} {friend.firstName}
                        </div>
                    ))
                    :
                    ''
            }
        </div>
    )
}