import React, {useEffect} from "react"
import './Posts.css'
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectPosts} from "./postsSlice";
import {Post} from "./post/Post";

export const Posts = ({refDoc, imgUserURL, username, timestamp, caption, imgPostURL, comments}) => {

    const posts = useSelector(selectPosts)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    }, [posts])

    return (
        <div className={'feed__posts'}>
            {posts && posts.length !== 0 ?
                posts.map( post =>(
                    <Post idPost={post._id}
                          key={post._id}
                          imgUser={post.imgUser}
                          username={post.username}
                          timestamp={post.timestamp}
                          caption={post.caption}
                          imgPost={post.imgPost}
                          comments={post.comments}
                          likes={post.likes}
                          videoPoat={post.videoPost}
                          mood={post.mood}
                    />
                ))
                :
                ''
            }
        </div>
    )
}