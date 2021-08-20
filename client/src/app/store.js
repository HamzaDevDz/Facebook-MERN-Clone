import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/feed/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
