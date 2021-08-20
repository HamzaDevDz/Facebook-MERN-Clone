import React, {useState} from "react"
import './Upload.css'
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ImageIcon from '@material-ui/icons/Image';
import MoodIcon from '@material-ui/icons/Mood';

export const Upload = () => {

    const [caption, setCaption] = useState('')
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)

    return (
        <form className={'feed__upload'}>
            <div className={'feed__upload__caption'}>
                <Avatar className={'feed__upload__caption__avatar'} alt="H" src="hamza.jpg" />
                <TextField
                    className={'feed__upload__caption__input'}
                    label="Caption"
                    multiline
                    maxRows={4}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    variant="outlined"
                />
            </div>
            <div className={'feed__upload__multi'}>
                <label className={'feed__upload__multi__label feed__upload__multi__video'} htmlFor={'video'}>
                    <VideoCallIcon className={'feed__upload__multi__label__icon'} color={'error'} />
                    Vidéo
                    <input id={'video'} style={{display: 'none'}} type={'file'} value={video} onChange={e => setVideo(e.target.value)}/>
                </label>
                <label className={'feed__upload__multi__label feed__upload__multi__image'} htmlFor={'image'}>
                    <ImageIcon className={'feed__upload__multi__label__icon'} color={'error'} />
                    Image
                    <input id={'image'} style={{display: 'none'}} type={'file'} value={image}
                           onChange={e => setImage(e.target.value)}/>
                </label>
                <label className={'feed__upload__multi__label feed__upload__multi__mood'} htmlFor={'mood'}>
                    <MoodIcon className={'feed__upload__multi__label__icon'} color={'error'} />
                    Mood
                </label>
            </div>
        </form>
    )
}