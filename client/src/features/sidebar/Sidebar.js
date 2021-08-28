import React from "react"
import './Sidebar.css'
import Avatar from "@material-ui/core/Avatar";

export const Sidebar = () => {

    const username = 'HamzaHamdoud'

    return (
        <div className={'sidebar'}>
            <div className={'sidebar__point sidebar__user'}>
                <Avatar className={'sidebar__user__avatar'} alt="H" src="hamza.jpg" />
                <strong>{username}</strong>
            </div>
            <div className={'sidebar__point sidebar__covid'}>
                <strong>COVID-19 Information Center</strong>
            </div>
            <div className={'sidebar__point sidebar__pages'}>
                <strong>Pages</strong>
            </div>
            <div className={'sidebar__point sidebar__friends'}>
                <strong>Friends</strong>
            </div>
            <div className={'sidebar__point sidebar__messengers'}>
                <strong>Messengers</strong>
            </div>
            <div className={'sidebar__point sidebar__marketplace'}>
                <strong>Marketplace</strong>
            </div>
            <div className={'sidebar__point sidebar__videos'}>
                <strong>Videos</strong>
            </div>
            <div className={'sidebar__point sidebar__more'}>
                <strong>Pages</strong>
            </div>
        </div>
    )
}