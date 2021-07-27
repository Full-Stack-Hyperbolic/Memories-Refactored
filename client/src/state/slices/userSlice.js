import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const userSlice = createSlice({
  name: 'User',
  initialState: {
    googleProfile: null,
    googleTokenId: null,
    isSignUp: true,
    isLoading: false,
  },
  reducers: {
    toggleIsSignUp: state => {
      state.isSignUp = !state.isSignUp;
    },
    authUser: (state, action) => {
      const { result, token } = action?.payload;
      state.googleProfile = result;
      state.googleTokenId = token;
      console.log('Google profile = ', state.googleProfile);
      console.log('Google token = ', state.googleTokenId);
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
    },
  },
  //   extraReducers: builder => {

  //   }
});

export const { toggleIsSignUp, authUser } = userSlice.actions;
export default userSlice.reducer;
