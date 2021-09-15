import React from 'react'
import Header from "./header/Header";
import {Feed} from "./feed/Feed";
import {Sidebar} from "./sidebar/Sidebar";

export const Home = () => {
    return(
        <div className={'home'}>
            <Header />
            <Feed />
            <Sidebar />
        </div>
    )
}