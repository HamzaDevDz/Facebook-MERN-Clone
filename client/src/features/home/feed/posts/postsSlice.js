import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {ServerInstanceAddress} from "../../../../ServerInstance";

const initialState = {
    posts: [],
    statusLikePost: false,
    statusLikeComment: false
}

export const getPosts = createAsyncThunk(
    'post/retrieve',
    async (empty, thunkAPI) => {
        try {
            const response = await axios.get(ServerInstanceAddress+"/post/retrieve").then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const uploadPost = createAsyncThunk(
    'posts/upload',
    async (newPost, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/post/upload", newPost)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const addCommentToPostById = createAsyncThunk(
    'posts/comment/upload',
    async (newComment, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/post/comment/upload", newComment)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const likePostById = createAsyncThunk(
    'post/like',
    async (like, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/post/like", like)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const dislikePostById = createAsyncThunk(
    'post/dislike',
    async (like, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/post/dislike", like)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const likeCommentById = createAsyncThunk(
    'post/comment/like',
    async (like, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/post/comment/like", like)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const dislikeCommentById = createAsyncThunk(
    'post/comment/dislike',
    async (like, thunkAPI) => {
        try {
            await axios.post(ServerInstanceAddress+"/post/comment/dislike", like)
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLikePostById: {
            reducer(state, action){
                const idPost = action.payload.idPost
                const username = action.payload.username
                const index = state.posts.findIndex(p => {
                    return p._id === idPost
                })
                if(index !== -1){
                    if(state.posts[index].likes.includes(username)){
                        state.posts[index].likes.splice(state.posts[index].likes.indexOf(username), 1)
                    }
                    else{
                        state.posts[index].likes.push(username)
                    }
                }
            },
            prepare(idPost, username){
                return{
                    payload:{
                        idPost: idPost,
                        username: username
                    }
                }
            }
        },
        setLikeCommentById: {
            reducer(state, action){
                const indexPost = state.posts.findIndex(p => {
                    return p._id === action.payload.idPost
                })
                if(indexPost !== -1){
                    const indexComment = state.posts[indexPost].comments.findIndex(c => {
                        return c._id === action.payload.idComment
                    })
                    if(indexComment !== -1){
                        if(state.posts[indexPost].comments[indexComment].likes.includes(action.payload.username)){
                            state.posts[indexPost].comments[indexComment].likes.splice(state.posts[indexPost].comments[indexComment].likes.indexOf(action.payload.username), 1)
                        }
                        else{
                            state.posts[indexPost].comments[indexComment].likes.push(action.payload.username)
                        }
                    }
                }
            },
            prepare(idPost, idComment, username){
                return{
                    payload:{
                        idPost: idPost,
                        idComment: idComment,
                        username: username
                    }
                }
            }
        },
    },
    extraReducers: {
        // GET POSTS
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
        // UPLOAD POST
        [uploadPost.fulfilled]: (state, action) => {
            console.log('Post upload successfully !')
        },
        // ADD COMMENT TO POST BY ID
        [addCommentToPostById.fulfilled]: (state, action) => {
            console.log('Comment upload successfully !')
        },
        // LIKE-POST BY ID
        [likePostById.fulfilled]: (state, action) => {

        },
        [likePostById.pending]: (state, action) => {

        },
        // DISLIKE-POST BY ID
        [dislikePostById.fulfilled]: (state, action) => {

        },
        [dislikePostById.pending]: (state, action) => {

        },
        // LIKE-COMMENT BY ID
        [likeCommentById.fulfilled]: (state, action) => {

        },
        // DISLIKE-COMMENT BY ID
        [dislikeCommentById.fulfilled]: (state, action) => {

        },
    }
});

export const {setLikeCommentById, setLikePostById} = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts

export default postsSlice.reducer;