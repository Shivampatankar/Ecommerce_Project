package com.ecommerce.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.custom_exception.ResourceNotFoundException;
import com.ecommerce.dto.CartItemResponseDTO;
import com.ecommerce.dto.CartResponseDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;

@Service
@Transactional
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepo;
	private final CartItemRepository cartItemRepo;
	private final UserRepository userRepo;
	private final ProductRepository productRepo;

	public CartServiceImpl(CartRepository cartRepo, CartItemRepository cartItemRepo, 
						   UserRepository userRepo, ProductRepository productRepo) {
		this.cartRepo = cartRepo;
		this.cartItemRepo = cartItemRepo;
		this.userRepo = userRepo;
		this.productRepo = productRepo;
	}

	@Override
	public CartResponseDTO addToCart(Long userId, Long productId, int qty) {
	    User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
	    
	    Product product = productRepo.findById(productId)
	            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
	    
	    Cart cart = cartRepo.findByUser(user).orElseGet(() -> {
	        Cart newCart = new Cart();
	        newCart.setUser(user);
	        newCart.setCartItems(new ArrayList<>());
	        return cartRepo.save(newCart);
	    });
	    
	    if (cart.getCartItems() == null) {
	        cart.setCartItems(new ArrayList<>());
	    }
	    
	    CartItem item = new CartItem();
	    item.setCart(cart);
	    item.setProduct(product);
	    item.setQuantity(qty);
	    
	    cartItemRepo.save(item);
	    cart.getCartItems().add(item);
	    
	    return getUserCart(userId);
	}


	@Override
	public CartResponseDTO getUserCart(Long userId) {
	    User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

	    Cart cart = cartRepo.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("Cart empty"));

	    double total = cart.getCartItems().stream().mapToDouble(i -> i.getProduct().getProductPrice() * i.getQuantity())
	            .sum();

	    return new CartResponseDTO(user.getId(),
	            cart.getCartItems().stream().map(i -> new CartItemResponseDTO(
	                    i.getId(),
	                    i.getProduct().getId(),
	                    i.getProduct().getProductName(),
	                    i.getProduct().getProductImageUrl(),
	                    i.getProduct().getProductPrice(), 
	                    i.getQuantity())).toList(),
	            total);
	}




	@Override
	public void removeItem(Long itemId) {
		cartItemRepo.deleteById(itemId);
	}

	@Override
	public void clearCart(Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		Cart cart = cartRepo.findByUser(user).orElse(null);
		if (cart != null) {
			cartItemRepo.deleteAll(cart.getCartItems());
			cartRepo.delete(cart);
		}
	}
}
