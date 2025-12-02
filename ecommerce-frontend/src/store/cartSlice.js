import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/cart/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // Cart doesn't exist yet, return empty cart
        return { items: [], totalAmount: 0, totalItems: 0 };
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, qty }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/cart/add?userId=${userId}&productId=${productId}&qty=${qty}`);
      toast.success('Item added to cart!');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/cart/remove/${itemId}`);
      toast.success('Item removed from cart!');
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload.items || [];
        state.items = items;
        state.totalItems = items.length;
        state.totalAmount = action.payload.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const items = action.payload.items || [];
        state.items = items;
        state.totalItems = items.length;
        state.totalAmount = action.payload.total || 0;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalItems = state.items.length;
        state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
      });
  },
});

export const { clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;