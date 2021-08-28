import React from "react"
import './Posts.css'
import {useSelector} from "react-redux";
import {selectPosts} from "./postsSlice";
import {Post} from "./post/Post";

export const Posts = ({refDoc, imgUserURL, username, timestamp, caption, imgPostURL, comments}) => {

    const posts = useSelector(selectPosts)

    return (
        <div className={'feed__posts'}>
            {posts.map(({idPost, imgUserURL, username, timestamp, caption, imgPostURL, comments, likes})=>(
                <Post idPost={idPost}
                      key={idPost}
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