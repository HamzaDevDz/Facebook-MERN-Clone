import React, {useEffect} from "react"
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import {useDispatch} from "react-redux";
import {setLikesPostById} from "../postsSlice";
import {Comment} from "../comment/Comment";
import {calculateDifferenceTimestamps} from '../../../calcul/calcul'
import {UploadComment} from "../uploadComment/UploadComment";


export const Post = ({idPost, imgUserURL, username, timestamp, caption, imgPostURL, likes, comments}) => {

    const dispatch = useDispatch()
    const currentUsername = 'HamzaHamdoud'

    useEffect(()=>{
        if(likes.includes(currentUsername)){
            document.getElementById(`post_likes_${idPost}`).style.color = 'blue'
        }
        else{
            document.getElementById(`post_likes_${idPost}`).style.color = 'gray'
        }
    }, [likes])


    const hanldeLikePost = () => {
        dispatch(setLikesPostById(idPost, currentUsername))
    }

    const handleCommentsPost = (e) => {
        const commentsElement = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.feed__posts__post__comments')
        if(window.getComputedStyle(commentsElement).getPropertyValue('display') === 'flex'){
            commentsElement.style.display = 'none'
            e.target.querySelector('.feed__posts__post__states__comments__icon').style.color = 'gray'
        }
        else{
            commentsElement.style.display = 'flex'
            e.target.querySelector('.feed__posts__post__states__comments__icon').style.color = 'red'
        }
    }

    return (
        <div className={'feed__posts__post'}>
            <div className={'feed__posts__post__head'}>
                <Avatar className={'feed__posts__post__head__avatar'} alt={username[0]} src={imgUserURL} />
                <div className={'feed__posts__post__head__user'}>
                    <strong className={'feed__posts__post__head__user__username'}>{username}</strong>
                    <span className={'feed__posts__post__head__user__timestamp'}>
                        {calculateDifferenceTimestamps(timestamp, Date.now())}
                    </span>
                </div>
            </div>
            <div className={'feed__posts__post__caption'}>
                {caption}
            </div>
            {
                imgPostURL !== null ?
                    <img src={imgPostURL} alt={''} className={'feed__posts__post__image'} />
                    :
                    ''
            }
            <div className={'feed__posts__post__states'}>
                <div className={'feed__posts__post__states__likes'}
                     onClick={hanldeLikePost}
                >
                    <ThumbUpAltIcon className={'feed__posts__post__states__likes__icon'}
                                    id={`post_likes_${idPost}`}
                    />{likes.length}
                </div>
                <div className={'feed__posts__post__states__comments'}
                     onClick={handleCommentsPost}
                >
                    <CommentIcon className={'feed__posts__post__states__comments__icon'}
                                 style={{color: 'red'}}
                    />
                    <span>{comments.length}</span>
                </div>
            </div>
            <UploadComment idPost={idPost} />
            {
                comments.length !== 0 ?
                    <div className={'feed__posts__post__comments'}>
                        {comments.map(comment=>(
                            <Comment key={comment.idComment}
                                     idPost={idPost}
                                     idComment={comment.idComment}
                                     imgUserURL={comment.imgUserURL}
                                     username={comment.username}
                                     timestamp={comment.timestamp}
                                     text={comment.text}
                                     likes={comment.likes}
                            />
                        ))}
                    </div>
                    :
                    ''
            }
        </div>
    )
}