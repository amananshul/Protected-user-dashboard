// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null; // Add token property
  // Other auth-related properties
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null, // Initialize token
  // Other initial state values
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Set token from action payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null; // Reset token on logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
