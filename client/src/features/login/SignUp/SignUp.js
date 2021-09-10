import React, {useEffect, useState} from "react"
import './SignUp.css'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {selectUser, uploadUser} from "../loginSlice";
import ImageIcon from "@material-ui/icons/Image";
import axios from "axios"
import {ServerInstanceAddress} from '../../../ServerInstance'

export const SignUp = () => {

    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState(undefined)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    useEffect(()=>{
        if(user !== null){
            history.push('/home')
        }
    }, [user])

    const handleSignUp = (e) => {
        e.preventDefault()
        if(name && firstName && username && password && passwordConfirm){
            if(password === passwordConfirm){
                if(image){
                    // console.log(image)
                    const formData = new FormData()
                    formData.append('file', image)
                    axios.post(ServerInstanceAddress+'/image/upload', formData).then((res)=>{
                        console.log(res.data.filename)
                        const newUser = {
                            name: name.toUpperCase(),
                            firstName,
                            email: email ? email : '',
                            phone: phone ? phone : '',
                            imgUserName: res.data ? res.data : '',
                            username: username.toLowerCase(),
                            password
                        }
                        console.log(newUser)
                        dispatch(uploadUser(newUser))
                        setName('')
                        setFirstName('')
                        setEmail('')
                        setPhone('')
                        setUsername('')
                        setPassword('')
                        setPasswordConfirm('')
                    })
                }
            }
            else{
                alert('Password is not the same !')
            }
        }
        else{
            alert('Something wrong !')
        }
    }

    return(
        <div className={'signUp'}>
            <img src={'fb_img.png'} alt={''} className={'signUp__img'} />
            <form className={'signUp__form'}>
                <TextField label="Name" variant="outlined"
                           className={'signUp__form__name signUp__form__input'}
                           value={name}
                           onChange={e=>setName(e.target.value)}
                />
                <TextField label="First Name" variant="outlined"
                           className={'signUp__form__firstName signUp__form__input'}
                           value={firstName}
                           onChange={e=>setFirstName(e.target.value)}
                />
                <TextField label="Email" variant="outlined"
                           className={'signUp__form__email signUp__form__input'}
                           value={email}
                           onChange={e=>setEmail(e.target.value)}
                />
                <TextField label="Phone Number" variant="outlined"
                           className={'signUp__form__phone signUp__form__input'}
                           value={phone}
                           onChange={e=>setPhone(e.target.value)}
                />
                <label className={'signUp__form__label signUp__form__input'} htmlFor={'video'}>
                    <Button variant="contained" color="primary" component="span">
                        <ImageIcon className={'signUp__form__label__icon'} />
                        Upload Photo
                    </Button>
                    <input id={'video'} style={{display: 'none'}} type={'file'}
                           onChange={e => {
                               if(e.target.files[0]){
                                   setImage(e.target.files[0])
                               }}}
                    />
                </label>
                <TextField label="Username" variant="outlined"
                           className={'signUp__form__username signUp__form__input'}
                           value={username}
                           onChange={e=>setUsername(e.target.value)}
                />
                <TextField label="Password" variant="outlined"
                           className={'signUp__form__password signUp__form__input'}
                           type="Password"
                           value={password}
                           onChange={e=>setPassword(e.target.value)}
                />
                <TextField label="Confirm Password" variant="outlined"
                           className={'signUp__form__passwordConfirm signUp__form__input'}
                           type="Password"
                           value={passwordConfirm}
                           onChange={e=>setPasswordConfirm(e.target.value)}
                />
                <Button variant="contained" color="primary"
                        className={'signUp__form__btn'}
                        onClick={handleSignUp}
                        disabled={!(name && firstName && username && password && passwordConfirm)}
                >
                    Sign Up
                </Button>
            </form>
            <Button className={'signUp__login'}
                    onClick={()=>{
                        history.push('/login')
                    }}
            >Login</Button>
        </div>
    )
}