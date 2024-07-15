import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/home/todo/';

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const createTask = createAsyncThunk('task/createTask', async (taskData) => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.response ? error.response.data : error.message);
    throw error;
  }
});

export const updateTask = createAsyncThunk('task/updateTask', async (taskData) => {
  const token = localStorage.getItem('access_token');
  const { uid, ...rest } = taskData;
  const response = await axios.patch(`${API_URL}${uid}/`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (uid) => {
  const token = localStorage.getItem('access_token');
  await axios.delete(`${API_URL}${uid}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { uid };
});

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.data;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.data; 
        const index = state.tasks.findIndex((task) => task.uid === updatedTask.uid);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.uid !== action.payload.uid);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
