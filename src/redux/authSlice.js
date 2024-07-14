import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/account/';

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}register/`, userData);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post(`${API_URL}login/`, userData);
  localStorage.setItem('access_token', response.data.data.token.access);
  localStorage.setItem('refresh_token', response.data.data.token.refresh);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
