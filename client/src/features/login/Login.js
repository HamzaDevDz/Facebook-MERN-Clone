import React, {useState} from "react"
import Button from "@material-ui/core/Button";
import './Login.css'
import TextField from "@material-ui/core/TextField"
import {useHistory} from "react-router-dom"

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

    }

    return(
        <div className={'login'}>
            <img src={'fb_img.png'} alt={''} className={'login__img'} />
            <form className={'login__form'}>
                <TextField label="Username" variant="outlined"
                           className={'login__form__username'}
                           value={username}
                           onChange={e=>setUsername(e.target.value)}
                />
                <TextField label="Password" variant="outlined"
                           type="Password"
                           className={'login__form__password'}
                           value={password}
                           onChange={e=>setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary"
                        className={'login__form__btn'}
                        onClick={handleLogin}
                >
                    Login
                </Button>
            </form>
            <Button className={'login__signUp'}
                    onClick={()=> {
                        history.push('/signUp')
                    }}
            >Sign Up</Button>
        </div>
    )
}