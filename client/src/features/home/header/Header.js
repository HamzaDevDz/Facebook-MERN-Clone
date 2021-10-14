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
import {searchFriends, selectFriends, selectStatusSearch} from "./headerSlice";
import CircularProgress from '@mui/material/CircularProgress';
import PersonAddDisabledOutlinedIcon from '@mui/icons-material/PersonAddDisabledOutlined';


export const Header = () => {

    const user = useSelector(selectUser)

    const dispatch = useDispatch()
    const history = useHistory()

    const [openPlus, setOpenPlus] = useState(false)
    const [picProfile, setPicProfile] = useState('')
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)

    const friends = useSelector(selectFriends)
    const statusSearch = useSelector(selectStatusSearch)

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
            dispatch(searchFriends(search))
            if(!focus){
                setFocus(true)
            }
        }
        else{
            if(focus){
                setFocus(false)
            }
        }
    }, [search])

    const handleOpenPlus = (e) => {
        if(!openPlus){
            setOpenPlus(true)
            document.querySelector('.header__account__btnPlus__iconPlus').style.color = 'blue'
            document.addEventListener('click', ()=>{

            })
        }
        else{
            setOpenPlus(false)
            document.querySelector('.header__account__btnPlus__iconPlus').style.color = '#6E6F70'
        }
    }

    document.onclick = (e) => {
        // console.log(e.target)
        const inputSeach = document.querySelector('.header__search__barSearch__input')
        if(inputSeach === document.activeElement){
            setFocus(true)
        }
        if(search !== '' && focus && !inputSeach.contains(e.target)){
            const searchBox = document.querySelector('.header__searchBox')
            if(!searchBox.contains(e.target)){
                setFocus(false)
            }
        }
        if(openPlus){
            const btnPlus = document.querySelector('.header__account__btnPlus')
            if(btnPlus !== null){
                if(!btnPlus.contains(e.target)){
                    let headerPlus = document.querySelector('.header__plus')
                    if (!headerPlus.contains(e.target)) {
                        setOpenPlus(false)
                        document.querySelector('.header__account__btnPlus__iconPlus').style.color = '#6E6F70'
                    }
                }
            }

        }
    }

    const handleLogOut = () => {
        dispatch(logOut())
        history.push('/login')
    }

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
                                            <div className={'header__searchBox__friend'}>
                                                <Avatar src={getImage(f.imgUserName)} alt={f.username.toUpperCase()}
                                                        className={'header__searchBox__friend__avatar'}
                                                />
                                                {f.firstName} {f.name}
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

        </div>
    )
}