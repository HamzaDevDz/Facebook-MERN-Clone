import React, {useEffect} from "react"
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import {useDispatch, useSelector} from "react-redux";
import {dislikePostById, likePostById, selectStatusLikePost, setLikePostById} from "../postsSlice";
import {Comment} from "../comment/Comment";
import {calculateDifferenceTimestamps} from '../../../../calcul/calcul'
import {UploadComment} from "../uploadComment/UploadComment";
import {selectUser} from "../../../../login/loginSlice";
import {getImage} from "../../../../../ServerInstance";


export const Post = ({idPost, imgUser, username, timestamp, caption, imgPost, likes, comments}) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const statusLikePost = useSelector(selectStatusLikePost)

    useEffect(()=>{
        if(likes.includes(user.username)){
            document.getElementById(`post_likes_${idPost}`).style.color = 'blue'
        }
        else{
            document.getElementById(`post_likes_${idPost}`).style.color = 'gray'
        }
    }, [])

    useEffect(()=>{
        if(statusLikePost){
            document.querySelector(`#feed__posts__post__${idPost} .feed__posts__post__states .feed__posts__post__states__likes`).style.pointerEvents = 'none'
        }
        else{
            document.querySelector(`#feed__posts__post__${idPost} .feed__posts__post__states .feed__posts__post__states__likes`).style.pointerEvents = 'auto'
        }
    }, [statusLikePost])

    const hanldeLikePost = () => {
        if(!likes.includes(user.username)){
            dispatch(likePostById({idPost, username: user.username}))
            document.getElementById(`post_likes_${idPost}`).style.color = 'blue'
        }
        else{
            dispatch(dislikePostById({idPost, username: user.username}))
            document.getElementById(`post_likes_${idPost}`).style.color = 'gray'
        }
        dispatch(setLikePostById(idPost, user.username))
    }

    const displayCommentsPost = (e) => {
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
        <div className={'feed__posts__post'} id={'feed__posts__post__' + idPost}>
            <div className={'feed__posts__post__head'}>
                <Avatar className={'feed__posts__post__head__avatar'} alt={username[0]} src={getImage(imgUser)} />
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
                imgPost !== null ?
                    <img src={getImage(imgPost)} alt={''} className={'feed__posts__post__image'} />
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
                     onClick={displayCommentsPost}
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
                        {comments.map((comment)=>(
                            <Comment key={comment._id}
                                     idPost={idPost}
                                     idComment={comment._id}
                                     imgUserName={comment.imgUserName}
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