import React, {useState} from "react"
import './Upload.css'
import Avatar from "@material-ui/core/Avatar";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ImageIcon from '@material-ui/icons/Image';
import MoodIcon from '@material-ui/icons/Mood';
import {useDispatch} from "react-redux";
import {addPost} from "../postsSlice";

export const Upload = () => {

    const [caption, setCaption] = useState('')
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)

    const user = {username:'HamzaHamdoud', imgUserURL:'hamza.jpg'}

    const dispatch = useDispatch()

    const handleUpload = (e) => {
        e.preventDefault()
        if(caption){
            if(image){
                console.log(image)
                // dispatch(addPost(user.imgUserURL, user.username, caption, ))
            }
        }
    }

    return (
        <form className={'feed__upload'}>
            <div className={'feed__upload__caption'}>
                <Avatar className={'feed__upload__caption__avatar'} alt="H" src="hamza.jpg" />
                <input type={'text'}
                       placeholder={'Caption'}
                       className={'feed__upload__caption__input'}
                       value={caption}
                       onChange={(e) => setCaption(e.target.value)}
                 />
            </div>
            <div className={'feed__upload__multi'}>
                <label className={'feed__upload__multi__label feed__upload__multi__video'} htmlFor={'video'}>
                    <VideoCallIcon className={'feed__upload__multi__label__icon'} color={'error'} />
                    Vidéo
                    <input id={'video'} style={{display: 'none'}} type={'file'} value={video}
                           onChange={e => {
                               if(e.target.files[0]){
                                   setVideo(e.target.files[0])
                               }
                           }}/>
                </label>
                <label className={'feed__upload__multi__label feed__upload__multi__image'} htmlFor={'image'}>
                    <ImageIcon className={'feed__upload__multi__label__icon'} color={'error'} />
                    Image
                    <input id={'image'} style={{display: 'none'}} type={'file'}
                           onChange={e => {
                               if(e.target.files[0]){
                                   setImage(e.target.files[0])
                               }
                           }}/>
                </label>
                <label className={'feed__upload__multi__label feed__upload__multi__mood'} htmlFor={'mood'}>
                    <MoodIcon className={'feed__upload__multi__label__icon'} color={'error'} />
                    Mood
                </label>
            </div>
            <button type={'submit'} className={'feed__upload__btn'} style={{display: 'none'}}
                    onClick={handleUpload}
            ></button>
        </form>
    )
}