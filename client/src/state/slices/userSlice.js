import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ formData, history }) => {
    try {
      // log in the user

      // redirect to the home page
      history.push('/');
    } catch (error) {
      console.log(error);
    }
    return;
  }
);

export const signUp = createAsyncThunk(
  'auth/signIn',
  async ({ formData, history }) => {
    try {
      // register the user

      // redirect user to the home page
      history.push('/');
    } catch (error) {
      console.log(error);
    }
    return;
  }
);

const userSlice = createSlice({
  name: 'User',
  initialState: {
    authData: null,
    isSignUp: true,
    isLoading: false,
  },
  reducers: {
    toggleIsSignUp: (state, action) => {
      const data = action?.payload;
      if (typeof data === 'boolean') state.isSignUp = data;
      else state.isSignUp = !state.isSignUp;
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
