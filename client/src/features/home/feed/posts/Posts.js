import React, {useEffect} from "react"
import './Posts.css'
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectPosts} from "./postsSlice";
import {Post} from "./post/Post";
import {pusher} from "../../../../ServerInstance";
import {selectUser} from "../../../login/loginSlice";

export const Posts = () => {

    const posts = useSelector(selectPosts)
    const user = useSelector(selectUser)

    const dispatch = useDispatch()

    useEffect(()=>{
        const channel = pusher.subscribe('posts');
        channel.bind('inserted', function(data) {
            dispatch(getPosts({idUser: user._id, friends: user.idFriends}))
        })
        channel.bind('updated', function(data) {
            dispatch(getPosts({idUser: user._id, friends: user.idFriends}))
        })
    },[])

    useEffect(()=>{
        dispatch(getPosts({idUser: user._id, friends: user.idFriends}))
    }, [])


    return (
        <div className={'feed__posts'}>
            {posts && posts.length !== 0 ?
                posts.map( post =>(
                    <Post idPost={post._id}
                          key={post._id}
                          imgUser={post.imgUserName}
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