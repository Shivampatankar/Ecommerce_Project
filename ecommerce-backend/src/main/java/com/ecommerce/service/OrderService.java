package com.ecommerce.service;

import java.util.List;
import com.ecommerce.dto.OrderResponseDTO;

public interface OrderService {
    OrderResponseDTO placeOrder(Long userId);
    List<OrderResponseDTO> getUserOrders(Long userId);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO updateOrderStatus(Long orderId, String status);

}
