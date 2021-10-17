import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ServerInstanceAddress} from "../../../ServerInstance";
import axios from "axios";

const initialState = {
    search:{
        friends: [],
        statusSearch: false
    },
    notification:{
        requesters: []
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

export const getUser = createAsyncThunk(
    'user/get',
    async (idUser, thunkAPI) => {
        try {
            const response = await axios.get(ServerInstanceAddress+"/user/get/?idUser="+idUser).then(res => {
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
    reducers: {
        cleanRequesters : (state, action) => {
            state.notification.requesters = []
        }
    },
    extraReducers: {
        // UPLOAD USER
        [searchFriends.pending]: (state, action) => {
            state.search.statusSearch = true
            state.search.friends = []
        },
        [searchFriends.fulfilled]: (state, action) => {
            // state.search.friends = []
            state.search.statusSearch = false
            state.search.friends = action.payload
        },
        // INVITE FRIEND
        [inviteFriend.fulfilled]: (state, action) => {

        },
        // DISINVITE FRIEND
        [disinviteFriend.fulfilled]: (state, action) => {

        },
        // GET USER
        [getUser.fulfilled]: (state, action) => {
            state.notification.requesters.push(action.payload)
        },

    }
})

export const {cleanRequesters} = headerSlice.actions

export const selectFriends = (state) => state.header.search.friends
export const selectStatusSearch = (state) => state.header.search.statusSearch
export const selectRequesters = (state) => state.header.notification.requesters

export default headerSlice.reducer