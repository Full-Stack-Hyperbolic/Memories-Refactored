import * as api from '../../api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// These functions receive the response sent from the SERVER
export const getAllPosts = createAsyncThunk('posts/allPosts', async () => {
  const response = await api.fetchPosts();
  return response.data;
});

export const createPost = createAsyncThunk('posts/create', async newPost => {
  const response = await api.createPost(newPost);
  return response.data;
});

export const updatePost = createAsyncThunk(
  'posts/:id/update',
  async ({ id, updatedPost }) => {
    const response = await api.updatePost(id, updatedPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk('posts/id/delete', async postId => {
  const response = await api.deletePost(postId);
  return response.data;
});

export const postsSlice = createSlice({
  name: 'MemoryPosts',
  initialState: {
    posts: [],
    selectedPost: null,
    isLoading: false,
  },
  // 'Normal' reducers that alter the state within the app go below here
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedPost: (state, action) => {
      if (action.payload === null) state.selectedPost = null;
      else
        state.selectedPost = state.posts
          .filter(post => action.payload === post._id)
          .pop();
    },
  },
  // All of the async reducers that interact with the DB go below here
  // the action.payload is coming from the (res)ponse from the back-end
  extraReducers: builder => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = state.posts.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload);
      state.isLoading = false;
    });
  },
});

export const { setIsLoading, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
