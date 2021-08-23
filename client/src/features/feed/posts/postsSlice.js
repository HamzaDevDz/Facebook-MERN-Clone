import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [
        {
            id: 1,
            imgUserURL: 'hamza.jpg',
            username: 'HamzaHamdoud',
            timestamp: '1629721044600',
            caption: 'Golf 6 Match 2',
            imgPostURL: 'hamza.jpg',
            comments:[{
                idComment: 1,
                imgUserURL: 'hamza.jpg',
                username: 'HamzaHamdoud',
                timestamp: '1629721044700',
                text: 'Super !',
                likes: ['HamzaHamdoud', 'HakemHamdoud']
            }],
            likes: [
                'BaghdadHamdoud', 'HamzaHamdoud'
            ]

        }
    ]
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLikesPostById: {
            reducer(state, action){
                const idPost = action.payload.idPost
                const username = action.payload.username
                const index = state.posts.findIndex(p => {
                    return p.id === idPost
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
        }
    },
    extraReducers: {}
});

export const {setLikesPostById} = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;