import React, {useEffect, useState} from "react"
import './Upload.css'
import Avatar from "@material-ui/core/Avatar";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ImageIcon from '@material-ui/icons/Image';
import MoodIcon from '@material-ui/icons/Mood';
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../../../login/loginSlice";
import {getImage, ServerInstanceAddress} from "../../../../../ServerInstance";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import {uploadPost} from "../postsSlice";

export const Upload = () => {

    const [caption, setCaption] = useState('')
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [mood, setMood] = useState(undefined)

    const user = useSelector(selectUser)
    const [img, setImg] = useState('')

    const dispatch = useDispatch()

    const handleUpload = (e) => {
        e.preventDefault()
        if(caption){
            let newPost = {
                username: user.username,
                imgUser: user.imgUserName,
                caption: caption,
                timestamp: Date.now(),
                likes: [],
                comments: [],
                videoPost: '',
                mood: ''
            }
            if(image){
                const formData = new FormData()
                formData.append('file', image)
                axios.post(ServerInstanceAddress+'/image/upload', formData).then(res => {
                    newPost['imgPost'] = res.data
                    dispatch(uploadPost(newPost))
                })
            }
            else{
                newPost['imgPost'] = ''
                if(video){

                }
            }
            if(mood){

            }
            // console.log(newPost)
            setCaption('')
            setImage(undefined)
            setVideo(undefined)
            setMood(undefined)
        }
    }

    useEffect(()=>{
        setImg(getImage(user.imgUserName))
    },[])

    return (
        <form className={'feed__upload'}>
            <FormControl style={{width: '98%'}}>
                <div className={'feed__upload__caption'}>
                    <Avatar className={'feed__upload__caption__avatar'} alt="H" src={img} />
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
                >
                    Upload
                </button>
            </FormControl>
        </form>
    )
}