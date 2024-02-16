// src/services/authService.ts
import axios, { AxiosError } from 'axios';

const API_URL = 'https://reqres.in/api';

// Function to handle sign-up
export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const login = async (email: string, password: string) => {
    try {

      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log(response)
      return response.data;
    } catch (error:any) {
        throw error.response.data.error;
    }
  };
// Function to fetch user data
export const fetchUserData = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Helper function to handle API errors
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Handle specific error cases based on status code
      if (error.response.status === 400) {
        throw new Error('Bad request');
      } else if (error.response.status === 401) {
        throw new Error('Unauthorized');
      } else {
        throw new Error('An error occurred');
      }
    } else {
      // Handle network errors or other general errors
      throw new Error('Network error occurred');
    }
  } else {
    // Handle non-Axios errors
    throw new Error('An unexpected error occurred');
  }
};
