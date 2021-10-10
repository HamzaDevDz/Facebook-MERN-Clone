import React, {useEffect, useState} from "react"
import './Comment.css'
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {dislikeCommentById, likeCommentById, setLikeCommentById} from "../postsSlice";
import {useDispatch, useSelector} from "react-redux";
import {calculateDifferenceTimestamps} from '../../../../calcul/calcul'
import {getImage} from "../../../../../ServerInstance";
import {selectUser} from "../../../../login/loginSlice";

export const Comment = ({idPost, idComment, imgUserName, username, timestamp, text, likes}) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [timer, setTimer] = useState(0)
    const [flag, setFlag] = useState(0)

    useEffect(()=>{
        if(likes.includes(user.username)){
            document.getElementById(`comment_likes_${idPost}_${idComment}`).style.color = 'blue'
        }
        else{
            document.getElementById(`comment_likes_${idPost}_${idComment}`).style.color = 'gray'
        }
    }, [])

    const handleLikeComment = () => {
        clearTimeout(timer)
        console.log(idComment)
        if(!likes.includes(user.username)){
            document.getElementById(`comment_likes_${idPost}_${idComment}`).style.color = 'blue'
            if(flag === 1){
                setFlag(0)
            }else{
                setFlag(1)
                setTimer(setTimeout(()=>{
                    dispatch(likeCommentById({idPost: idPost, idComment: idComment, username: user.username}))
                    setFlag(0)
                }, 3000))
            }
        }else{
            document.getElementById(`comment_likes_${idPost}_${idComment}`).style.color = 'gray'
            if(flag === 1){
                setFlag(0)
            }else{
                setFlag(1)
                setTimer(setTimeout(()=>{
                    dispatch(dislikeCommentById({idPost: idPost, idComment: idComment, username: user.username}))
                    setFlag(0)
                }, 3000))
            }
        }
        dispatch(setLikeCommentById(idPost, idComment, user.username))
    }

    return(
        <div className={'comment'} id={idComment}>
            <Avatar className={'comment__avatar'} alt={user.username[0].toUpperCase()} src={getImage(user.imgUserName)} />
            <div className={'comment__userAndTextAndStates'}>
                <strong className={'comment__userAndTextAndStates__user'}>{username}</strong>
                <p className={'comment__userAndTextAndStates__text'}>{text}</p>
                <div className={'comment__userAndTextAndStates__states'}>
                    <div className={'comment__userAndTextAndStates__states__likes'}
                         onClick={handleLikeComment}
                    >
                        <ThumbUpAltIcon className={'comment__userAndTextAndStates__states__likes__icon'}
                                        fontSize={'small'}
                                        id={`comment_likes_${idPost}_${idComment}`}
                        />
                        {likes.length}
                    </div>
                    <div className={'comment__userAndTextAndStates__states__timestamp'}>
                        {calculateDifferenceTimestamps(timestamp, Date.now())}
                    </div>
                </div>
            </div>
        </div>
    )
}