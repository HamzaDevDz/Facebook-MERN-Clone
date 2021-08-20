import React, {useState} from "react";
import './Header.css'
import HomeIcon from '@material-ui/icons/Home';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Input from "@material-ui/core/Input";
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";

const Header = () => {

    const [openPlus, setOpenPlus] = useState(false)

    const hidePlus = () => {
        document.querySelector('.header__plus').classList.remove('open')
        setOpenPlus(false)
        document.querySelector('.header__account__btnPlus__iconPlus').style.color = '#6E6F70'
    }

    const showPlus = () => {
        document.querySelector('.header__plus').classList.add('open')
        setOpenPlus(true)
        document.querySelector('.header__account__btnPlus__iconPlus').style.color = 'blue'
    }

    const handleOpenPlus = (e) => {
        if(!openPlus){
            showPlus()
        }
        else{
            hidePlus()
        }
    }

    return (
        <div className={'header'}>
            <div className={'header__search'}>
                <img className={'header__search__img'} src={'icons/facebook_icon.png'} alt={''} />
                <div className={'header__search__barSearch'}>
                    <SearchIcon className={'header__search__barSearch__icon'} fontSize="medium" color="action"/>
                    <Input className={'header__search__barSearch__input'} placeholder="Search"/>
                </div>
            </div>
            <div className={'header__nav'}>
                <HomeIcon className={'header__nav__icon'} color={'primary'} fontSize={'medium'}/>
                <OndemandVideoIcon className={'header__nav__icon'} color={'primary'} fontSize={'medium'}/>
                <StorefrontIcon className={'header__nav__icon'} color={'primary'} fontSize={'medium'}/>
            </div>
            <div className={'header__account'}>
                <div className={'header__account__user'}>
                    <Avatar className={'header__account__user__avatar'} alt="H" src="hamza.jpg" />
                    <strong>Hamza Hamdoud</strong>
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
                    <Avatar className={'header__plus__profile__avatar'} alt="H" src="hamza.jpg" />
                    <div className={'header__plus__profile__text'}>
                        <strong>Hamza Hamdoud</strong>
                        <p className={'header__plus__profile__text__placeholder'}>Go to the profile</p>
                    </div>
                </div>
                <div className={'header__plus__btn header__plus__settings'}>
                    <SettingsIcon className={'header__plus__btn__icon'} /> Setting
                </div>
                <div className={'header__plus__btn header__plus__logout'}>
                    <ExitToAppIcon className={'header__plus__btn__icon'} /> Log Out
                </div>
            </div>
        </div>
    )
}

export default Header