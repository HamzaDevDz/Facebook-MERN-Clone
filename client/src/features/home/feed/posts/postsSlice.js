import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {generateUniqueId} from '../../../calcul/calcul'
import axios from "axios";
import {ServerInstanceAddress} from "../../../../ServerInstance";

const initialState = {
    posts: []
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
    'posts/retrieve',
    async (newPost, thunkAPI) => {
        try {
            const response = await axios.post(ServerInstanceAddress+"/post/upload", newPost).then(res => {
                return res.data
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    })

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLikesPostById: {
            reducer(state, action){
                const idPost = action.payload.idPost
                const username = action.payload.username
                const index = state.posts.findIndex(p => {
                    return p.idPost === idPost
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
                    return p.idPost === action.payload.idPost
                })
                if(indexPost !== -1){
                    const indexComment = state.posts[indexPost].comments.findIndex(c => {
                        return c.idComment === action.payload.idComment
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
        addCommentToPostById: {
            reducer(state, action){
                const index = state.posts.findIndex(p => {
                    return p.idPost === action.payload.idPost
                })
                if(index !== -1){
                    const newComment = {
                        idComment: action.payload.idComment,
                        imgUserURL: action.payload.imgUserURL,
                        username: action.payload.username,
                        text: action.payload.text,
                        timestamp: Date.now(),
                        likes: []
                    }
                    state.posts[index].comments.push(newComment)
                }
            },
            prepare(idPost, comment, username, imgUserURL){
                return{
                    payload:
                        {
                            idPost: idPost,
                            text: comment,
                            username: username,
                            imgUserURL: imgUserURL,
                            idComment: generateUniqueId()
                        }
                }
            }
        },
        addPost: {
            reducer(state, action){
                state.posts.push(action.payload)
            },
            prepare(imgUserURL, username, caption, imgPostURL){
                return {
                    payload: {
                        idPost: generateUniqueId(),
                        imgUserURL,
                        username,
                        timestamp: Date.now(),
                        caption,
                        imgPostURL,
                        comments: [],
                        likes: []
                    }
                }
            }
        }
    },
    extraReducers: {
        // GET POSTS
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
        // UPLOAD POST
        [uploadPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        },
    }
});

export const {setLikesPostById, setLikeCommentById, addCommentToPostById, addPost} = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts

export default postsSlice.reducer;