import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../../ServerInstance";
import axios from "axios";

const initialState = {
    friends: []
}

export const addFriend = createAsyncThunk(
    'user/addFriend',
    async (idUserRequest, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/user/addFriend", idUserRequest)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const removeFriend = createAsyncThunk(
    'user/removeFriend',
    async (idUserFriend, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/user/removeFriend", idUserFriend)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const getFriends = createAsyncThunk(
    'user/getFriends',
    async (idUser, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/getFriends", idUser).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const friendsBoxSlice = createSlice({
    name: 'friendsBox',
    initialState,
    reducers: {},
    extraReducers: {
        // GET FRIENDS
        [getFriends.fulfilled]: (state, action) => {
            state.friends = action.payload
        },
    }
})

// export const {} = friendsBoxSlice.actions

export const selectFriends = state => state.friendsBox.friends


export default friendsBoxSlice.reducer