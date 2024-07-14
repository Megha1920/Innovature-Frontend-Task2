import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import fileReducer from './fileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    file: fileReducer,
  },
});
