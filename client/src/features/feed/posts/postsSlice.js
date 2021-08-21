import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [
        {
            id: 1,
            imgUserURL: 'hamza.jpg',
            username: 'Hamza Hamdoud',
            timestamp: '20:08:2021:00:00:00',
            caption: 'Golf 6 Match 2',
            imgPostURL: 'hamza.jpg',
            comments:[{
                imgUserURL: 'hamza.jpg',
                username: 'Hamza Hamdoud',
                timestamp: '19:08:2021:00:00:00',
                text: 'Super !',
                likes: 0
            }],
            likes : 2
        }
    ]
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {}
});

// export const { } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;