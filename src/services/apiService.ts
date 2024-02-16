// src/services/apiService.ts
import axios from 'axios';

const API_URL = 'https://reqres.in/api';

export const getDashboardData = async (token: string | null = '') => {
  try {
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch dashboard data');
  }
};
