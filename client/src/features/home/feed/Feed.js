import React from "react"
import {Upload} from './posts/upload/Upload'
import {Posts} from "./posts/Posts"
import './Feed.css'

export const Feed = () => {
    return(
        <div className={'feed'}>
            <Upload />
            <Posts />
        </div>
    )
}