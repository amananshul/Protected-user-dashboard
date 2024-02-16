// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ToastReducer from './toastSlice';
// Import other reducers as needed

const rootReducer = combineReducers({
  toast: ToastReducer,
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
