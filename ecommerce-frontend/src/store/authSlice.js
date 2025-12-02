import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { formatRegistrationData, formatLoginData } from '../utils/authHelpers';
import toast from 'react-hot-toast';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, expectedRole }, { rejectWithValue }) => {
    try {
      const payload = formatLoginData({ email, password });
      
      const response = await api.post('/api/auth/login', payload);
      const { token, user } = response.data;
      
      // Validate role before storing
      if (expectedRole === 'admin' && user.userRole !== 'ADMIN') {
        return rejectWithValue('Access denied. Admin credentials required.');
      }
      
      if (expectedRole === 'customer' && user.userRole !== 'CUSTOMER') {
        return rejectWithValue('Please use Admin login for admin accounts.');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Role-based success message
      if (user.userRole === 'ADMIN') {
        toast.success(`Welcome Admin, ${user.name}!`);
      } else {
        toast.success(`Welcome, ${user.name}!`);
      }
      
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const payload = formatRegistrationData(userData);
      
      const response = await api.post('/api/auth/register', payload);
      toast.success('Registration successful! Redirecting to login...');
      return response.data;
    } catch (error) {
      console.error('Registration error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      toast.success('Logged out successfully');
      window.location.href = '/login';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Redirect will be handled in component
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;