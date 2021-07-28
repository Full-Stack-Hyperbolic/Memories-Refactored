import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const signIn = createAsyncThunk(
  'user/signin',
  async ({ formData, history }) => {
    try {
      // log in the user
      console.log('FORM DATA = ', formData);
      const { data } = await api.signIn(formData);

      // redirect to the home page
      history.push('/');
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signup',
  async ({ formData, history }) => {
    try {
      // register the user
      console.log('are we here tho');
      const { data } = await api.signUp(formData);

      // redirect user to the home page
      history.push('/');
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
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
  extraReducers: builder => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.authData = action?.payload;
      console.log('Setting localStorage with ', action.payload);
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authData = action?.payload;
      console.log('Setting localStorage with ', action.payload);
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
    });
  },
});

export const { toggleIsSignUp, authUser, deAuth } = userSlice.actions;
export default userSlice.reducer;
