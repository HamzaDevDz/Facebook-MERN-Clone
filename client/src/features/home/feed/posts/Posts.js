import React, {useEffect} from "react"
import './Posts.css'
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectPosts, selectStatusNewPost} from "./postsSlice";
import {Post} from "./post/Post";
import Pusher from 'pusher-js'

const pusher = new Pusher('67843c3bf2c33b4e1d28', {
    cluster: 'eu'
});

export const Posts = () => {

    const posts = useSelector(selectPosts)

    const dispatch = useDispatch()

    useEffect(()=>{
        const channel = pusher.subscribe('posts');
        channel.bind('inserted', function(data) {
            dispatch(getPosts())
        })
        channel.bind('updated', function(data) {
            dispatch(getPosts())
        })
    },[])

    useEffect(()=>{
        dispatch(getPosts())
    }, [])


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
                          videoPost={post.videoPost}
                          mood={post.mood}
                    />
                ))
                :
                ''
            }
        </div>
    )
}