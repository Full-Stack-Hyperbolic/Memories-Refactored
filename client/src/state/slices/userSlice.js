import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const userSlice = createSlice({
  name: 'User',
  initialState: {
    authData: null,
    isSignUp: true,
    isLoading: false,
  },
  reducers: {
    toggleIsSignUp: state => {
      state.isSignUp = !state.isSignUp;
    },
    authUser: (state, action) => {
      state.authData = action?.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
    },
    deAuth: state => {
      localStorage.clear();
      state.authData = null;
    },
  },
  //   extraReducers: builder => {

  //   }
});

export const { toggleIsSignUp, authUser, deAuth } = userSlice.actions;
export default userSlice.reducer;
