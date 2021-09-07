import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../ServerInstance";
import axios from "axios";


const initialState = {
    user: null,
    err: null
}

export const uploadUser = createAsyncThunk(
    'upload/user',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/upload/user", user).then(res => {
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
            const response = await axios.post(ServerInstanceAddress+"/retrieve/user", user).then((res)=>{
                return res.data
            })
            return response
        } catch (error) {
            // console.log(error.response.status)
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

// export const retrieveImage = createAsyncThunk(
//     '/retrieve/image/single',
//     async (filename, thunkAPI) => {
//         try{
//             const response = await axios.get(ServerInstanceAddress + 'retrieve/image/single', {
//                 params : {
//                     filename : filename
//                 }
//             }).then( res => {
//                 return res.data
//             })
//             console.log(response)
//             return response
//         }catch (error) {
//             // console.log(error.response.status)
//             return thunkAPI.rejectWithValue({ error: error.message });
//         }
//     }
// )

export async function retrieveImage(filename) {
    const response = await axios.get(ServerInstanceAddress + 'retrieve/image/single', {
        params : {
            filename : filename
        }
    }).then( res => {
        return res.data
    })
    console.log(response)
    return response
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetError: (state) => {
            state.err = null
        }
    },
    extraReducers: {
        // UPLOAD USER
        [uploadUser.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        // RETRIEVE USER
        [retrieveUser.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [retrieveUser.rejected]: (state, action) => {
            const messageError = action.payload.error.split(' ')
            const codeError = messageError[messageError.length - 1]
            state.err = parseInt(codeError)
        }
    }
})

export const {resetError} = loginSlice.actions

export const selectUser = (state) => state.login.user
export const selectErr = (state) => state.login.err

export default loginSlice.reducer