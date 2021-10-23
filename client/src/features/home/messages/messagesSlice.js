import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../../ServerInstance";
import axios from "axios";

const initialState = {
    discussions: []
}

export const getDiscussion = createAsyncThunk(
    'messages/getDiscussion',
    async (idUsers, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/messages/getDiscussion", {idUser1: idUsers.idUser1, idUser2: idUsers.idUser2}).then(res => {
                return res.data
            })

            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        cleanDiscussion : (state, action) => {
            state.discussions.splice(action.payload, 1)
        }
    },
    extraReducers: {
        [getDiscussion.fulfilled]: (state, action) => {
            if(action.payload !== null){
                state.discussions.push(action.payload)
            }
        },
    }
})

export const {cleanDiscussion} = messagesSlice.actions

export const selectDiscussions = state => state.messages.discussions


export default messagesSlice.reducer