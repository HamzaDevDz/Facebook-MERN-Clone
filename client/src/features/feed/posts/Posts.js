import React from "react"
import './Posts.css'
import {useSelector} from "react-redux";
import {selectPosts} from "./postsSlice";
import {Post} from "./Post";

export const Posts = ({refDoc, imgUserURL, username, timestamp, caption, imgPostURL, comments}) => {

    const posts = useSelector(selectPosts)

    console.log(posts)

    return (
        <div className={'feed__posts'}>
            {posts.map(({id, imgUserURL, username, timestamp, caption, imgPostURL, comments, likes})=>(
                <Post refDoc={id}
                      imgUserURL={imgUserURL}
                      username={username}
                      timestamp={timestamp}
                      caption={caption}
                      imgPostURL={imgPostURL}
                      comments={comments}
                      likes={likes}
                      />
            ))}
        </div>
    )
}