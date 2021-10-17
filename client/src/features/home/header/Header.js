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
import {logOut, selectUser, synchUser} from "../../login/loginSlice";
import {getImage} from "../../../ServerInstance";
import {useHistory} from "react-router-dom"
import {
    cleanRequesters,
    disinviteFriend,
    getUser,
    inviteFriend,
    searchFriends,
    selectFriends, selectRequesters,
    selectStatusSearch
} from "./headerSlice";
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddDisabledOutlinedIcon from '@mui/icons-material/PersonAddDisabledOutlined';
import Button from "@mui/material/Button";
import Pusher from 'pusher-js'

const pusher = new Pusher('67843c3bf2c33b4e1d28', {
    cluster: 'eu'
});

export const Header = () => {

    const user = useSelector(selectUser)

    const dispatch = useDispatch()
    const history = useHistory()

    const [openPlus, setOpenPlus] = useState(false)
    const [picProfile, setPicProfile] = useState('')
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)

    const friends = useSelector(selectFriends)
    const statusSearch = useSelector(selectStatusSearch)
    const requesters = useSelector(selectRequesters)

    // SEARCH -----------------------------------------------------------------------------------
    useEffect(()=>{
        const home = document.querySelector('.home')
        if(home !== null) {
            if (focus) {
                home.style.filter = 'brightness(80%)'
            } else {
                home.style.filter = 'brightness(100%)'
            }
        }

    }, [focus])

    useEffect(()=>{
        if(search !== ''){
            dispatch(searchFriends({search: search, idUser: user._id}))
        }
    }, [search])

    // PLUS -----------------------------------------------------------------------------------
    const handleOpenPlus = (e) => {
        if(!openPlus){
            setOpenPlus(true)
            document.querySelector('.header__account__btnPlus__icon').style.color = 'blue'
        }
        else{
            setOpenPlus(false)
            document.querySelector('.header__account__btnPlus__icon').style.color = '#6E6F70'
        }
    }

    // NOTIFICATION -----------------------------------------------------------------------------------
    const handleOpenNotification = () => {
        if(!openNotification){
            setOpenNotification(true)
            document.querySelector('.header__account__btnNotification__icon').style.color = 'blue'
        }else{
            setOpenNotification(false)
            document.querySelector('.header__account__btnNotification__icon').style.color = '#6E6F70'
        }
    }

    // CLICK EVENT -----------------------------------------------------------------------------------
    document.onclick = (e) => {
        // console.log(e.target)
        // SEARCH
        const inputSeach = document.querySelector('.header__search__barSearch__input')
        if(inputSeach === document.activeElement){
            setFocus(true)
        }
        if(focus && !inputSeach.contains(e.target)){
            const searchBox = document.querySelector('.header__searchBox')
            if(searchBox !== null){
                if(!searchBox.contains(e.target)){
                    setFocus(false)
                }
            }else{
                setFocus(false)
            }
        }
        // PLUS
        if(openPlus){
            const btnPlus = document.querySelector('.header__account__btnPlus')
            if(btnPlus !== null){
                if(!btnPlus.contains(e.target)){
                    const headerPlus = document.querySelector('.header__plus')
                    if (!headerPlus.contains(e.target)) {
                        setOpenPlus(false)
                        document.querySelector('.header__account__btnPlus__icon').style.color = '#6E6F70'
                    }
                }
            }
        }
        if(openNotification){
            const btnNotification = document.querySelector('.header__account__btnNotification')
            if(btnNotification !== null){
                if(!btnNotification.contains(e.target)){
                    const headerNotification = document.querySelector('.header__notification')
                    if(!headerNotification.contains(e.target)){
                        setOpenNotification(false)
                        document.querySelector('.header__account__btnNotification__icon').style.color = '#6E6F70'
                    }
                }
            }
        }
    }

    // LOG OUT -----------------------------------------------------------------------------------
    const handleLogOut = () => {
        dispatch(logOut())
        history.push('/login')
    }

    // LOCATION and PUSHER -----------------------------------------------------------------------------------
    useEffect(()=>{
        if(user === null || user.length === 0){
            history.push('/login')
        }
        // if(user.idRequests !== 0){
        //     user.idRequests.forEach(idUser => {
        //         dispatch(getUser(idUser))
        //     })
        // }
        const channel = pusher.subscribe('users');
        channel.bind('inserted', function(data) {
            console.log('inserted user Client')
            if(user !== null){
                dispatch(searchFriends({search: search, idUser: user._id}))
            }
        })
        channel.bind('updated', function(data) {
            console.log('updated user Client')
            if(user !== null){
                const dislike = {search: search, idUser: user._id}
                dispatch(synchUser({idUser: user._id}))
                dispatch(searchFriends(dislike))
            }

        })
    }, [])

    useEffect(() => {
        console.log('user has modified')
        if(user !== null){
            dispatch(cleanRequesters())
            if(user.idRequests.length !== 0){
                user.idRequests.forEach(idUser => {
                    dispatch(getUser(idUser))
                })
            }
        }

    },[user])

    // RENDER -------------------------------------------------------------------------------------------------------
    return (
        <div className={'header'}>
            <div className={'header__search'}>
                <img className={'header__search__img'} src={'icons/facebook_icon.png'} alt={''} />
                <div className={'header__search__barSearch'}>
                    <SearchIcon className={'header__search__barSearch__icon'} fontSize="medium" color="action"/>
                    <input className={'header__search__barSearch__input'} placeholder="Search Friends"
                           type={'text'}
                           value={search}
                           onChange={(e)=>setSearch(e.target.value)}
                    />
                </div>
            </div>
            {
                focus ?
                    search.length !== 0 ?
                        <div className={'header__searchBox'}>
                            {
                                !statusSearch ?
                                    friends.length !== 0 ?
                                        friends.map(f => (
                                            <div key={f._id} className={'header__searchBox__friend'} >
                                                <div className={'header__searchBox__friend__information'}>
                                                    <Avatar src={getImage(f.imgUserName)} alt={f.username.toUpperCase()}
                                                            className={'header__searchBox__friend__information__avatar'}
                                                    />
                                                    {f.firstName} {f.name}
                                                </div>
                                                {
                                                    !f.idRequests.includes(String(user._id)) ?
                                                        <Button variant="contained"
                                                                className={'header__searchBox__friend__btn'}
                                                                onClick={() => {
                                                                    console.log('invite friend')
                                                                    dispatch(inviteFriend({idUser: user._id, idRequest: f._id}))
                                                                }}
                                                        >Invite</Button>
                                                        :
                                                        <Button variant="outlined"
                                                                className={'header__searchBox__friend__btn'}
                                                                onClick={()=>{
                                                                    console.log('disinvite friend')
                                                                    dispatch(disinviteFriend({idUser: user._id, idRequest: f._id}))
                                                                }}
                                                        >Disinvite</Button>
                                                }
                                            </div>
                                        ))
                                        :
                                        <div className={'header__searchBox__noresult'}>
                                            <PersonAddDisabledOutlinedIcon className={'header__searchBox__noresult__icon'} />
                                            <p className={'header__searchBox__noresult__text'}>No Result</p>
                                        </div>

                                    :
                                    <CircularProgress color="secondary" />
                            }
                        </div>
                        :
                        ''
                    :
                    ''
            }
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
                            src={getImage(user ? user.imgUserName : '')}
                    />
                    <strong>{user ? user.firstName : ''} {user? user.name : ''}</strong>
                </div>
                <IconButton className={'header__account__btn header__account__btnChat'}>
                    <ChatIcon className={'header__account__btn__icon'} fontSize={'small'} color="action"/>
                </IconButton >
                <IconButton className={'header__account__btn header__account__btnNotification'}
                            onClick={handleOpenNotification}>
                    <NotificationsIcon className={'header__account__btn__icon header__account__btnNotification__icon'} fontSize={'small'} color="action"/>
                </IconButton>
                <IconButton className={'header__account__btn header__account__btnPlus'}
                            onClick={handleOpenPlus}>
                    <KeyboardArrowDownIcon className={'header__account__btn__icon header__account__btnPlus__icon'} fontSize={'small'} color="action"/>
                </IconButton>
            </div>
            {
                openPlus ?
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
                    :
                    ''
            }
            {
                openNotification ?
                    <div className={'header__notification'}>
                        {
                            requesters.length !== 0 ?
                                requesters.map(requester => (
                                    <div key={'request-'+requester._id} className={'header__notification__requester'}>
                                        <div className={'header__notification__requester__information'}>
                                            <Avatar
                                                className={'header__notification__requester__information__avatar'}
                                                src={getImage(requester.imgUserName)} alt={requester.username[0].toUpperCase()} />
                                            {requester.firstName} {requester.name}
                                        </div>
                                        <div className={'header__notification__requester__btn'}>
                                            <Button
                                                className={'header__notification__requester__btnAccept'}
                                                size="small"
                                                variant="text">Accept</Button>
                                            <Button
                                                className={'header__notification__requester__btnRefuse'}
                                                size="small"
                                                color="secondary"
                                                variant="text">Refuse</Button>
                                        </div>

                                    </div>
                                ))
                                :
                                <div className={'header__notification__noresult'}>
                                    No one invited you !
                                </div>
                        }
                    </div>
                    :
                    ''
            }
        </div>
    )
}