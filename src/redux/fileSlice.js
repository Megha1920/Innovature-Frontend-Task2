import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/file/';

export const uploadFile = createAsyncThunk('file/uploadFile', async (fileData) => {
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  formData.append('file', fileData.file);
  const response = await axios.post(`${API_URL}upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const downloadFile = createAsyncThunk('file/downloadFile', async (fileId) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${API_URL}download/${fileId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  return { url, filename: 'file.txt' }; 
});

export const fileSlice = createSlice({
  name: 'file',
  initialState: {
    files: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
