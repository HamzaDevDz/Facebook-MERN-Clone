import React, {useEffect, useState} from "react"
import Button from "@material-ui/core/Button";
import './Login.css'
import TextField from "@material-ui/core/TextField"
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {
    resetError,
    retrieveLocalUser,
    retrieveUser,
    selectErr,
    selectStatusLogin,
    selectUser,
    synchUser
} from "./loginSlice";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from "@material-ui/lab/AlertTitle";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const history = useHistory()

    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const err = useSelector(selectErr)
    const statusLogin = useSelector(selectStatusLogin)

    useEffect(()=>{
        document.querySelector('.login__form__error').style.display = 'none'
    },[])

    useEffect(()=>{
        if(user !== null){
            dispatch(synchUser({idUser: user._id}))
            history.push("/home")
        }
        else{
            dispatch(retrieveLocalUser())
        }
    }, [user])

    useEffect(()=>{
        if(err !== null){
            document.querySelector('.login__form__error').style.display = 'flex'
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
                document.querySelector('.login__form__error').style.display = 'none'
                setError('')
                dispatch(resetError())
            }, 5000)
        }
    }, [err])

    useEffect(()=>{
        if(statusLogin !== null){
            // waiting
            document.querySelector('.login__form__wait').style.display = 'flex'
            // document.querySelector('.login__form__input').style.pointerEvents = 'none'
        }
        else{
            // not waiting : success or fail
            document.querySelector('.login__form__wait').style.display = 'none'
            // document.querySelector('.login__form__input').style.pointerEvents = 'auto'
            setUsername('')
            setPassword('')
        }
    }, [statusLogin])

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('click login')
        if(username && password){
            const userLogin = {
                username: username.toLocaleLowerCase(),
                password
            }
            dispatch(retrieveUser(userLogin))

        }
    }

    return(
        <div className={'login'}>
            <img src={'fb_img.png'} alt={''} className={'login__img'} />
            <form className={'login__form'}>
                <FormControl className={'login__form__formControl'}>
                    <TextField label="Username" variant="outlined"
                               className={'login__form__username login__form__input'}
                               value={username}
                               onChange={e=>setUsername(e.target.value)}
                               disabled={statusLogin !== null}
                    />
                    <TextField label="Password" variant="outlined"
                               type="Password"
                               className={'login__form__password login__form__input'}
                               value={password}
                               onChange={e=>setPassword(e.target.value)}
                               disabled={statusLogin !== null}
                    />
                    <Alert severity="error" className={'login__form__error'}>
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                    <Button variant="contained" color="primary"
                            className={'login__form__btn'}
                            onClick={handleLogin}
                            disabled={!username || !password || statusLogin !== null}
                            type={'submit'}
                    >
                        Login
                    </Button>
                    <CircularProgress className={'login__form__wait'} style={{display: 'none'}}/>
                </FormControl>
            </form>
            <Button className={'login__signUp'}
                    onClick={()=> {
                        history.push('/signUp')
                    }}
            >Sign Up</Button>
        </div>
    )
}