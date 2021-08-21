import React from "react"
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';

export const Post = ({refDoc, imgUserURL, username, timestamp, caption, imgPostURL, comments, likes}) => {
    return (
        <div className={'feed__posts__post'}>
            <div className={'feed__posts__post__head'}>
                <Avatar className={'feed__posts__post__head__avatar'} alt={username[0]} src={imgUserURL} />
                <div className={'feed__posts__post__head__user'}>
                    <strong>{username}</strong>
                    <span>{timestamp}</span>
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
                <div className={'feed__posts__post__states__likes'}>
                    <ThumbUpAltIcon className={'feed__posts__post__states__likes__icon'} color={'primary'}/>{likes}
                </div>
                <div className={'feed__posts__post__states__comments'}>
                    <CommentIcon className={'feed__posts__post__states__comments__icon'} color={'action'} />{comments.length}
                </div>
            </div>
            {
                comments.length !== 0 ?
                    <div className={'feed__posts__post__comments'}>
                        {comments.map(comment=>(
                            <div className={'feed__posts__post__comments__comment'}>
                                <Avatar className={'feed__posts__post__comments__comment__avatar'} alt={comment.username[0]} src={comment.imgUserURL} />
                                <div className={'feed__posts__post__comments__comment__userAndTextAndStates'}>
                                    <strong className={'feed__posts__post__comments__comment__userAndTextAndStates__user'}>{comment.username}</strong>
                                    <p className={'feed__posts__post__comments__comment__userAndTextAndStates__text'}>{comment.text}</p>
                                    <div className={'feed__posts__post__comments__comment__userAndTextAndStates__states'}>
                                        <div className={'feed__posts__post__comments__comment__userAndTextAndStates__states__likes'}>
                                            <ThumbUpAltIcon className={'feed__posts__post__comments__comment__userAndTextAndStates__states__likes__icon'} color={'primary'} fontSize={'small'}/>{comment.likes}
                                        </div>
                                        <div className={'feed__posts__post__comments__comment__userAndTextAndStates__states__timestamp'}>
                                            {comment.timestamp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    ''
            }
        </div>
    )
}