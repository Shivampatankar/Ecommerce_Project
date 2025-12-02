package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.custom_exception.ApiException;
import com.ecommerce.custom_exception.ResourceNotFoundException;
import com.ecommerce.dto.OrderItemResponseDTO;
import com.ecommerce.dto.OrderResponseDTO;
import com.ecommerce.entity.*;
import com.ecommerce.repository.*;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepo;
    private final CartRepository cartRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;

    public OrderServiceImpl(UserRepository userRepo, CartRepository cartRepo, 
                           OrderRepository orderRepo, OrderItemRepository orderItemRepo) {
        this.userRepo = userRepo;
        this.cartRepo = cartRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
    }

    @Override
    public OrderResponseDTO placeOrder(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Cart cart = cartRepo.findByUser(user)
                .orElseThrow(() -> new ApiException("Cart is empty"));

        if (cart.getCartItems().isEmpty()) {
            throw new ApiException("Your cart has no items");
        }

        double total = cart.getCartItems().stream()
                .mapToDouble(i -> i.getQuantity() * i.getProduct().getProductPrice())
                .sum();

        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .status(OrderStatus.PENDING)
                .build();

        Order savedOrder = orderRepo.save(order);

        // Save order items and add to order
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getProductPrice())
                    .build();

            OrderItem saved = orderItemRepo.save(orderItem);
            orderItems.add(saved);
        }

        savedOrder.setOrderItems(orderItems);

        // Clear cart
        cart.getCartItems().clear();
        cartRepo.save(cart);

        return convertToDTO(savedOrder);
    }

    @Override
    public List<OrderResponseDTO> getUserOrders(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return orderRepo.findByUser(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private OrderResponseDTO convertToDTO(Order order) {
        List<OrderItemResponseDTO> items = order.getOrderItems()
                .stream()
                .map(i -> {
                    OrderItemResponseDTO dto = new OrderItemResponseDTO();
                    dto.setProductName(i.getProduct().getProductName());
                    dto.setProductImageUrl(i.getProduct().getProductImageUrl());
                    dto.setQuantity(i.getQuantity());
                    dto.setPrice(i.getPrice());
                    return dto;
                }).collect(Collectors.toList());

        OrderResponseDTO response = new OrderResponseDTO();
        response.setOrderId(order.getId());
        response.setUserId(order.getUser().getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus().name());
        response.setItems(items);

        return response;
    }
    
    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepo.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    @Override
    public OrderResponseDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        order.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        Order savedOrder = orderRepo.save(order);
        
        return convertToDTO(savedOrder);
    }



}
