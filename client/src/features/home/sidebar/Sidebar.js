import React, {useEffect, useState} from "react"
import './Sidebar.css'
import Avatar from "@material-ui/core/Avatar";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector} from "react-redux";
import {selectUser} from "../../login/loginSlice";
import {getImage} from "../../../ServerInstance";

export const Sidebar = () => {

    const user = useSelector(selectUser)
    const [img, setImg] = useState('')
    useEffect(()=>{
        setImg(getImage(user.imgUserName))
    }, [])

    return (
        <div className={'sidebar'}>
            <div className={'sidebar__user'}>
                <Avatar className={'sidebar__user__avatar'} alt="H" src={img} />
                <strong className={'sidebar__user__text'}>{user.firstName} {user.name}</strong>
            </div>
            <div className={'sidebar__point sidebar__covid'}>
                <LocalHospitalIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>COVID-19 Information Center</strong>
            </div>
            <div className={'sidebar__point sidebar__pages'}>
                <EmojiFlagsIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>Pages</strong>
            </div>
            <div className={'sidebar__point sidebar__friends'}>
                <PeopleAltIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>Friends</strong>
            </div>
            <div className={'sidebar__point sidebar__messengers'}>
                <ChatIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>Messengers</strong>
            </div>
            <div className={'sidebar__point sidebar__marketplace'}>
                <StorefrontIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>Marketplace</strong>
            </div>
            <div className={'sidebar__point sidebar__videos'}>
                <YouTubeIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>Videos</strong>
            </div>
            <div className={'sidebar__point sidebar__more'}>
                <ExpandMoreIcon className={'sidebar__point__icon'} style={{color:'#3F51B5'}} />
                <strong className={'sidebar__user__text'}>More</strong>
            </div>
        </div>
    )
}