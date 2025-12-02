package com.ecommerce.service;

import com.ecommerce.dto.CartResponseDTO;

public interface CartService {
    CartResponseDTO addToCart(Long userId, Long productId, int qty);
    CartResponseDTO getUserCart(Long userId);
    void removeItem(Long itemId);
    void clearCart(Long userId);
}
