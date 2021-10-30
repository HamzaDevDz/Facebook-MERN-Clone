import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/home/feed/posts/postsSlice';
import loginReducer from '../features/login/loginSlice'
import headerReducer from '../features/home/header/headerSlice'
import friendsBoxReducer from '../features/home/friends/friendsSlice'
import messagesReducer from "../features/home/messages/messagesSlice"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    login: loginReducer,
    header: headerReducer,
    friendsBox: friendsBoxReducer,
    messages: messagesReducer
  },
});
