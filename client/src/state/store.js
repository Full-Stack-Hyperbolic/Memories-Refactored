import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    // memoryPosts = object containing: { posts: [array]}
    memoryPosts: postsReducer,
    user: userReducer,
  },
});
