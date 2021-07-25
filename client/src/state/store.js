import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

export default configureStore({
  reducer: {
    // memoryPosts = object containing: { posts: [array]}
    memoryPosts: postsReducer,
  },
});
