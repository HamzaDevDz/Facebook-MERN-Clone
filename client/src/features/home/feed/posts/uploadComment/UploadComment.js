import React, {useState} from "react"
import './UploadComment.css'
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import {useDispatch} from "react-redux";
import {addCommentToPostById} from "../postsSlice";

export const UploadComment = ({idPost}) => {

    const user = {username: 'HamzaHamdoud', imgUserURL: 'hamza.jpg'}
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleUploadComment = (e) => {
        e.preventDefault()
        dispatch(addCommentToPostById(idPost, comment, user.username, user.imgUserURL))
        setComment('')
    }

    return (
        <form className={'feed__posts__post__uploadComment'}>
            <Avatar className={'feed__posts__post__uploadComment__avatar'} alt={user.username[0]} src={user.imgUserURL} />
            <Input className={'feed__posts__post__uploadComment__input'} placeholder="Comment"
                   value={comment}
                   onChange={e => setComment(e.target.value)}
            />
            <button className={'feed__posts__post__uploadComment__btn'} style={{display: 'none'}}
                    onClick={handleUploadComment}
            />
        </form>
    )
}