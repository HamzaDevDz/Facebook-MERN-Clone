import React, {useState} from "react"
import './UploadComment.css'
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import {useDispatch, useSelector} from "react-redux";
// import {addCommentToPostById} from "../postsSlice";
import FormControl from "@material-ui/core/FormControl";
import {selectUser} from "../../../../login/loginSlice";
import {getImage} from "../../../../../ServerInstance";
import {addCommentToPostById} from "../postsSlice";

export const UploadComment = ({idPost}) => {

    // const user = {username: 'HamzaHamdoud', imgUserURL: 'hamza.jpg'}
    const user = useSelector(selectUser)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleUploadComment = (e) => {
        e.preventDefault()
        const newComment = {
            idPost: idPost,
            comment:{
                username: user.username,
                imgUserName: user.imgUserName,
                text: comment,
                timestamp: Date.now(),
                likes: []
            }

        }
        dispatch(addCommentToPostById(newComment))
        setComment('')
    }

    return (
        <form className={'feed__posts__post__uploadComment'}>
            <FormControl className={'feed__posts__post__uploadComment__formControl'}>
                <Avatar className={'feed__posts__post__uploadComment__avatar'} alt={user.username[0].toUpperCase()} src={getImage(user.imgUserName)} />
                <Input className={'feed__posts__post__uploadComment__input'} placeholder="Comment"
                       value={comment}
                       onChange={e => setComment(e.target.value)}
                />
                <button className={'feed__posts__post__uploadComment__btn'} style={{display: 'none'}}
                        onClick={handleUploadComment}
                />
            </FormControl>

        </form>
    )
}