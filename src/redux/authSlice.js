import axios from 'axios';
import { LogOut } from './authThunks';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

//* https body request, headers, method, url, params
//* post get put patch
export const selectIsLoggedIn = state => state.auth.isLogedIn;

export const selectUser = state => state.auth.user;

export const selectEmail = state => state.auth.userData?.email;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const setToken = token => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestRegisterThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLoginThunk = createAsyncThunk(
  'auth/login',
  async (formDataLogin, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/login', formDataLogin);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const requestAutoLoginThunk = createAsyncThunk(
  'auth/autoLogin',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setToken(token);
      const { data } = await $instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const token = thunkAPI.getState().auth.token;
      if (token) {
        return true;
      }
      return false;
    },
  }
);
const initialState = {
  token: null,
  userData: null,
  isLoading: false,
  error: null,
  isLogedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(requestRegisterThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRegisterThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogedIn = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestRegisterThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestLoginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogedIn = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestAutoLoginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestAutoLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogedIn = true;
        state.userData = action.payload;
      })
      .addCase(requestAutoLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(LogOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LogOut.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
