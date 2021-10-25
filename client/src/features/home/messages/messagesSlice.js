import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../../ServerInstance";
import axios from "axios";

const initialState = {
    discussions: [],
    statusUpDateDiscussions: false
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

export const addMessage = createAsyncThunk(
    'messages/addMessage',
    async (newMessage, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/messages/addMessage", newMessage).then(res => {
                return res.data
            })

            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })
export const synchMessages = createAsyncThunk(
    'messages/synchMessages',
    async (messages, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/messages/synchMessages", messages).then(res => {
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
            if(state.discussions.length === 1){
                state.discussions = []
            }else{
                state.discussions.splice(action.payload, 1)
            }
        },
        resetStatusUpDateDiscussions : (state, action) => {
           state.statusUpDateDiscussions = false
        }
    },
    extraReducers: {
        [getDiscussion.fulfilled]: (state, action) => {
            if(action.payload !== null){
                const check = state.discussions.findIndex(d => d.messages._id === action.payload.messages._id)
                if(check === -1){
                    state.discussions.push(action.payload)
                    state.statusUpDateDiscussions = true
                }
            }
        },
        [synchMessages.fulfilled]: (state, action) => {
            const index = state.discussions.findIndex(d => d.messages._id === action.payload._id)
            state.discussions[index].messages = action.payload
            state.statusUpDateDiscussions = true
        }
    }
})

export const {cleanDiscussion, resetStatusUpDateDiscussions} = messagesSlice.actions

export const selectDiscussions = state => state.messages.discussions
export const selectStatusUpDateDiscussions = state => state.messages.statusUpDateDiscussions


export default messagesSlice.reducer