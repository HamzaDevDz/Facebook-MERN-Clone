import React, {useEffect, useState} from "react"
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import {useDispatch, useSelector} from "react-redux";
import {dislikePostById, likePostById, setLikePostById} from "../postsSlice";
import {Comment} from "../comment/Comment";
import {calculateDifferenceTimestamps} from '../../../../calcul/calcul'
import {UploadComment} from "../uploadComment/UploadComment";
import {selectUser} from "../../../../login/loginSlice";
import {getImage} from "../../../../../ServerInstance";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton"
import path from "path"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export const Post = ({idPost, imgUser, username, timestamp, caption, imgPost, likes, comments}) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [timer, setTimer] = useState(0)
    const [flag, setFlag] = useState(0)
    const [displayComments, setDisplayComments] = useState(true)

    useEffect(()=>{
        if(likes.includes(user.username)){
            document.getElementById(`post_likes_${idPost}`).style.color = 'blue'
        }
        else{
            document.getElementById(`post_likes_${idPost}`).style.color = 'gray'
        }
    }, [])

    const hanldeLikePost = () => {
        clearTimeout(timer)
        if(!likes.includes(user.username)){
            document.getElementById(`post_likes_${idPost}`).style.color = 'blue'
            if(flag === 1)
            {
                setFlag(0)
            }
            else{
                setFlag(1)
                setTimer(setTimeout(()=>{
                    dispatch(likePostById({idPost, username: user.username}))
                    setFlag(0)
                },3000))
            }
        }
        else{
            document.getElementById(`post_likes_${idPost}`).style.color = 'gray'
            if(flag === 1){
                setFlag(0)
            }
            else{
                setFlag(1)
                setTimer(setTimeout(()=>{
                    dispatch(dislikePostById({idPost, username: user.username}))
                    setFlag(0)
                },3000))
            }
        }
        dispatch(setLikePostById(idPost, user.username))
    }

    const displayCommentsPost = (e) => {

        if(displayComments){
            setDisplayComments(false)
        }else{
            setDisplayComments(true)
        }

        // const commentsElement = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.feed__posts__post__comments')
        // if(window.getComputedStyle(commentsElement).getPropertyValue('display') === 'flex'){
        //     commentsElement.style.display = 'none'
        //     e.target.querySelector('.feed__posts__post__states__comments__icon').style.color = 'gray'
        // }
        // else{
        //     commentsElement.style.display = 'flex'
        //     e.target.querySelector('.feed__posts__post__states__comments__icon').style.color = 'red'
        // }
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
                    ['.jpg', '.jpeg', '.png'].includes(path.extname(imgPost)) ?
                        <img src={getImage(imgPost)} alt={''} className={'feed__posts__post__media'} />
                        :
                        <video controls className={'feed__posts__post__media'}>
                            <source src={getImage(imgPost)}/>
                        </video>
                        // <video src={getImage(imgPost)} className={'feed__posts__post__media'} />
                    :
                    ''
            }
            <div className={'feed__posts__post__states'}>
                <IconButton className={'feed__posts__post__states__likes'}
                     onClick={hanldeLikePost}
                >
                    <ThumbUpAltIcon className={'feed__posts__post__states__likes__icon'}
                                    id={`post_likes_${idPost}`}
                    />{likes.length}
                </IconButton>
                <IconButton className={'feed__posts__post__states__comments'}
                     onClick={displayCommentsPost}
                >
                    <CommentIcon className={'feed__posts__post__states__comments__icon'}
                                 style={{color: 'red'}}
                    />
                    <span>{comments.length}</span>
                </IconButton>
            </div>
            <UploadComment idPost={idPost} />
            {
                comments.length !== 0 ?
                    displayComments ?
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
                        <Button className={'feed__posts__post__moreComments'} variant="contained" color="primary"
                                onClick={()=>setDisplayComments(true)}
                        >
                            <MoreHorizIcon fontSize={'medium'}></MoreHorizIcon>
                        </Button>

                    :
                    ''
            }
        </div>
    )
}