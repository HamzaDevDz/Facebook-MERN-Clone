import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/home/feed/posts/postsSlice';
import loginReducer from '../features/login/loginSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    login: loginReducer
  },
});
