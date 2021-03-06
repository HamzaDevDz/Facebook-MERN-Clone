import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../ServerInstance";
import axios from "axios";

const initialState = {
    user: null,
    err: null,
    statusLogin: null
}

export const uploadUser = createAsyncThunk(
    'upload/user',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/upload", user).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const retrieveUser = createAsyncThunk(
    '/retrieve/user',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/retrieve", user).then((res)=>{
                return res.data
            })
            return response
        } catch (error) {
            // console.log(error.response.status)
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const synchUser = createAsyncThunk(
    'user/synchronisation',
    async (idUser, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/synchronisation", idUser).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })




export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetError: (state) => {
            state.err = null
        },
        retrieveLocalUser: (state) => {
            const localUser = localStorage.getItem('user')
            console.log(localUser)
            if(localUser){
                console.log('user found')
                state.user = JSON.parse(localUser)
            }
            else{
                console.log('user not found')
            }
        },
        logOut: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    },
    extraReducers: {
        // UPLOAD USER
        [uploadUser.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        // RETRIEVE USER
        [retrieveUser.fulfilled]: (state, action) => {
            state.statusLogin = null
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
        },
        [retrieveUser.rejected]: (state, action) => {
            state.statusLogin = null
            const messageError = action.payload.error.split(' ')
            const codeError = messageError[messageError.length - 1]
            state.err = parseInt(codeError)
        },
        [retrieveUser.pending]: (state) => {
            state.statusLogin = 'wait'
        },
        // SYNCHRONISATION
        [synchUser.fulfilled]: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
        },

    }
})

export const {resetError, retrieveLocalUser, logOut} = loginSlice.actions

export const selectUser = (state) => state.login.user
export const selectErr = (state) => state.login.err
export const selectStatusLogin = (state) => state.login.statusLogin

export default loginSlice.reducer