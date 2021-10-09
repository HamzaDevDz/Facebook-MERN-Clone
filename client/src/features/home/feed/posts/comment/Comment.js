import React, {useEffect} from "react"
import './Comment.css'
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {setLikeCommentById} from "../postsSlice";
import {useDispatch} from "react-redux";
import {calculateDifferenceTimestamps} from '../../../../calcul/calcul'
import {getImage} from "../../../../../ServerInstance";

export const Comment = ({idPost, idComment, imgUserName, username, timestamp, text, likes}) => {

    const dispatch = useDispatch()
    const currentUsername = 'HamzaHamdoud'

    useEffect(()=>{
        if(likes.includes(currentUsername)){
           document.getElementById(`comment_likes_${idPost}_${idComment}`).style.color = 'blue'
        }
        else{
            document.getElementById(`comment_likes_${idPost}_${idComment}`).style.color = 'gray'
        }
    }, [likes])

    const handleLikeComment = () => {
        dispatch(setLikeCommentById(idPost, idComment, currentUsername))
    }

    return(
        <div className={'comment'} id={idComment}>
            <Avatar className={'comment__avatar'} alt={username[0].toUpperCase()} src={getImage(imgUserName)} />
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