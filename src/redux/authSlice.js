import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

//* https body request, headers, method, url, params
//* post get put patch

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

const initialState = {
  token: null,
  userData: null,
  isLoading: false,
  error: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      state.isSignedIn = true;
    },

    logoutUser: state => {
      state.token = null;
      state.userData = null;
      state.isSignedIn = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(requestRegisterThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRegisterThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
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
        state.isSignedIn = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
