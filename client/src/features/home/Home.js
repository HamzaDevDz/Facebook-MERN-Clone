import React, {useEffect} from 'react'
import './Home.css'
import {Header} from "./header/Header.js";
import {Feed} from "./feed/Feed.js";
import {Sidebar} from "./sidebar/Sidebar.js";
import {useSelector} from "react-redux";
import {selectUser} from "../login/loginSlice";
import {useHistory} from "react-router-dom"
import {FriendsBox} from "./friendsBox/FriendsBox";
import {Messages} from "./messages/Messages";

export const Home = () => {

    const user = useSelector(selectUser)
    const history = useHistory()

    useEffect(()=>{
        if(user === null || user.length === 0){
            history.push('/login')
        }
    },[])

    return(
        user
            ?
                <div className={'home'}>
                    <Feed />
                    <Sidebar />
                </div>
            :
                ''

    )
}