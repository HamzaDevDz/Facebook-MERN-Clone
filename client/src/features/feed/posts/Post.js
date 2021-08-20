import React from "react"
import './Post.css'

export const Post = ({refDoc, imgUserURL, username, timestamp, caption, imgPostURL, comments}) => {
    return (
        <div className={'feed__posts__post'}>
            {caption}
        </div>
    )
}