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
      console.log(data);
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
  extraReducers: builder => builder,
});
