import React, {useState} from "react"
import './SignUp.css'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux";
import {uploadUser} from "../loginSlice";

export const SignUp = () => {
    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const handleSignUp = (e) => {
        e.preventDefault()
        const user = {
            name,
            firstName,
            email,
            phone,
            imgUserName: 'image-1629119342791.jpg',
            username,
            password
        }
        dispatch(uploadUser(user))
        // setName('')
        // setFirstName('')
        // setEmail('')
        // setPhone('')
        // setUsername('')
        // setPassword('')
        // setPasswordConfirm('')
    }

    return(
        <div className={'signUp'}>
            <img src={'fb_img.png'} alt={''} className={'signUp__img'} />
            <form className={'signUp__form'}>
                <div className={'signUp__form__name signUp__form__div'}>
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
                </div>
                <div className={'signUp__form__meta signUp__form__div'}>
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
                </div>
                <div className={'signUp__form__login signUp__form__div'}>
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
                </div>
                <Button variant="contained" color="primary"
                        className={'signUp__form__btn'}
                        onClick={handleSignUp}
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