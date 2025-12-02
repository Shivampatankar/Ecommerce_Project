import api from '../utils/api';
import toast from 'react-hot-toast';

export const cartService = {
  // Fetch cart from backend
  fetchCart: async (userId) => {
    try {
      const response = await api.get(`/api/cart/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return { items: [], total: 0 };
      }
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (userId, productId, qty) => {
    try {
      const response = await api.post(`/api/cart/add?userId=${userId}&productId=${productId}&qty=${qty}`);
      toast.success('Item added to cart!');
      return response.data;
    } catch (error) {
      toast.error('Unable to add item to cart');
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      await api.delete(`/api/cart/remove/${itemId}`);
      toast.success('Item removed from cart!');
      return itemId;
    } catch (error) {
      toast.error('Failed to remove item');
      throw error;
    }
  },

  // Update cart item quantity
  updateCartQuantity: async (itemId, qty) => {
    try {
      const response = await api.put(`/api/cart/update/${itemId}?qty=${qty}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to update quantity');
      throw error;
    }
  }
};