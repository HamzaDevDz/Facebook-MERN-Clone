import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../ServerInstance";
import axios from "axios";

const initialState = {
    user: undefined
}

export const uploadUser = createAsyncThunk(
    'upload/user',
    async (user, thunkAPI) => {
        console.log(ServerInstanceAddress)
        console.log(user)
        try {
            console.log(user)
            await axios.post(ServerInstanceAddress+"/upload/user", user)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: {
        // UPLOAD USER
        [uploadUser.fulfilled]: (state, action) => {
            state.user = action.payload
        }
    }
})

// export const {} = loginSlice.actions

export default loginSlice.reducer