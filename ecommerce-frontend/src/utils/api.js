import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dispatch logout if store is available
      if (window.store) {
        window.store.dispatch({ type: 'auth/logout' });
      }
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      // Suppress 403 errors - backend security config issue
      return Promise.reject(error);
    } else if (error.response?.data?.message && error.response?.status !== 403) {
      toast.error(error.response.data.message);
    } else if (error.message && error.response?.status !== 403) {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default api;