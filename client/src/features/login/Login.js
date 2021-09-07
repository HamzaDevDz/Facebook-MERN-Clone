import React, {useEffect, useState} from "react"
import Button from "@material-ui/core/Button";
import './Login.css'
import TextField from "@material-ui/core/TextField"
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {retrieveUser, selectErr, selectUser} from "./loginSlice";

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const history = useHistory()

    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const err = useSelector(selectErr)

    useEffect(()=>{
        if(user !== null){
            history.push("/home")
        }
    }, [user])

    useEffect(()=>{
        switch (err) {
            case 500:
                setError('Internal Server Error')
                break
            case 404:
                setError('Username not found')
                break
            default:
                setError('Incorrect password')
        }
        setTimeout(()=>{
            setError('')
        }, 5000)
    }, [err])

    const handleLogin = (e) => {
        e.preventDefault()
        if(username && password){
            const userLogin = {
                username: username.toLocaleLowerCase(),
                password
            }
            dispatch(retrieveUser(userLogin))
            setUsername('')
            setPassword('')
        }
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
                <p className={'login__form__error'}>
                    {error}
                </p>
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