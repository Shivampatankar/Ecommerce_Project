package com.ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartResponseDTO;
import com.ecommerce.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponseDTO> addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int qty) {

        CartResponseDTO cart = service.addToCart(userId, productId, qty);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponseDTO> viewCart(@PathVariable Long userId) {
        CartResponseDTO cart = service.getUserCart(userId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<String> removeItem(@PathVariable Long itemId) {
        service.removeItem(itemId);
        return ResponseEntity.ok("Item removed successfully");
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        service.clearCart(userId);
        return ResponseEntity.ok("Cart cleared successfully");
    }
}
