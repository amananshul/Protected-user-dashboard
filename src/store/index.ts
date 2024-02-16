// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ToastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: ToastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
