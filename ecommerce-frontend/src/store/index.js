import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

// Make store globally available for API interceptor
window.store = store;

export default store;