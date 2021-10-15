import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../../ServerInstance";
import axios from "axios";

const initialState = {
    search:{
        friends: [],
        statusSearch: false
    }
}

export const searchFriends = createAsyncThunk(
    'user/search',
    async (search, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/search", search).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const inviteFriend = createAsyncThunk(
    'user/invite',
    async (invitation, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/invite", invitation).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const disinviteFriend = createAsyncThunk(
    'user/disinvite',
    async (disinvitation, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/user/disinvite", disinvitation).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {},
    extraReducers: {
        // UPLOAD USER
        [searchFriends.pending]: (state, action) => {
            state.search.statusSearch = true
            state.search.friends = []
        },
        [searchFriends.fulfilled]: (state, action) => {
            state.search.statusSearch = false
            state.search.friends = action.payload
        },
        // INVITE FRIEND
        [inviteFriend.fulfilled]: (state, action) => {

        },
        // DISINVITE FRIEND
        [disinviteFriend.fulfilled]: (state, action) => {

        },
    }
})

// export const {} = loginSlice.actions

export const selectFriends = (state) => state.header.search.friends
export const selectStatusSearch = (state) => state.header.search.statusSearch

export default headerSlice.reducer