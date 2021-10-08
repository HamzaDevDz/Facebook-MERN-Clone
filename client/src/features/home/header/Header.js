import React, {useEffect, useState} from "react";
import './Header.css'
import HomeIcon from '@material-ui/icons/Home';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectUser} from "../../login/loginSlice";
import {getImage} from "../../../ServerInstance";
import {useHistory} from "react-router-dom"

export const Header = () => {

    const user = useSelector(selectUser)

    const dispatch = useDispatch()
    const history = useHistory()

    const [openPlus, setOpenPlus] = useState(false)
    const [picProfile, setPicProfile] = useState('')

    const hidePlus = () => {
        document.querySelector('.header__plus').classList.remove('open')
        setOpenPlus(false)
        document.querySelector('.header__account__btnPlus__iconPlus').style.color = '#6E6F70'
        // window.removeEventListener('click', eventListnerBox)
    }
    const showPlus = () => {
        document.querySelector('.header__plus').classList.add('open')
        setOpenPlus(true)
        document.querySelector('.header__account__btnPlus__iconPlus').style.color = 'blue'
        // window.addEventListener('click', eventListnerBox)
    }

    const handleOpenPlus = (e) => {
        if(!openPlus){
            showPlus()
        }
        else{
            hidePlus()
        }
    }

    // const eventListnerBox = (e) => {
    //     const box = document.querySelector('.header__plus')
    //     const btn = document.querySelector('.header__account__btnPlus')
    //     if(e.target !== box && e.target !== btn && !box.contains(e.target) && !btn.contains(e.target)){
    //         hidePlus()
    //     }
    // }

    const handleLogOut = () => {
        dispatch(logOut())
        history.push('/login')
    }

    return (
        <div className={'header'}>
            <div className={'header__search'}>
                <img className={'header__search__img'} src={'icons/facebook_icon.png'} alt={user.username[0].toUpperCase()} />
                <div className={'header__search__barSearch'}>
                    <SearchIcon className={'header__search__barSearch__icon'} fontSize="medium" color="action"/>
                    <input className={'header__search__barSearch__input'} placeholder="Search"
                           type={'text'}
                    />
                </div>
            </div>
            <div className={'header__nav'}>
                <div className={'header__nav__btn header__nav__home selected'}>
                    <HomeIcon className={'header__nav__btn__icon'} color={'primary'} fontSize={'medium'}/>
                    <span></span>
                </div>
                <div className={'header__nav__btn header__nav__video'}>
                    <OndemandVideoIcon className={'header__nav__btn__icon'} color={'primary'} fontSize={'medium'}/>
                </div>
                <div className={'header__nav__btn header__nav__marketplace'}>
                    <StorefrontIcon className={'header__nav__btn__icon'} color={'primary'} fontSize={'medium'}/>
                </div>
            </div>
            <div className={'header__account'}>
                <div className={'header__account__user'}>
                    <Avatar className={'header__account__user__avatar'} alt={''}
                            src={getImage(user.imgUserName)}
                    />
                    <strong>{user.firstName} {user.name}</strong>
                </div>
                <IconButton className={'header__account__btn header__account__btnChat'}>
                    <ChatIcon className={'header__account__btn__icon'} fontSize={'small'} color="action"/>
                </IconButton >
                <IconButton className={'header__account__btn header__account__btnNotification'}>
                    <NotificationsIcon className={'header__account__btn__icon'} fontSize={'small'} color="action"/>
                </IconButton>
                <IconButton className={'header__account__btn header__account__btnPlus'}
                            onClick={handleOpenPlus}>
                    <KeyboardArrowDownIcon className={'header__account__btn__icon header__account__btnPlus__iconPlus'} fontSize={'small'} color="action"/>
                </IconButton>
            </div>
            <div className={'header__plus'}>
                <div className={'header__plus__btn header__plus__profile'}>
                    <Avatar className={'header__plus__profile__avatar'} alt={user.username[0].toUpperCase()} src={getImage(user.imgUserName)} />
                    <div className={'header__plus__profile__text'}>
                        <strong>{user.firstName} {user.name}</strong>
                        <p className={'header__plus__profile__text__placeholder'}>Go to the profile</p>
                    </div>
                </div>
                <div className={'header__plus__btn header__plus__settings'}>
                    <SettingsIcon className={'header__plus__btn__icon'} /> Setting
                </div>
                <div className={'header__plus__btn header__plus__logout'}
                     onClick={handleLogOut}
                >
                    <ExitToAppIcon className={'header__plus__btn__icon'}/>
                    Log Out
                </div>
            </div>
        </div>
    )
}