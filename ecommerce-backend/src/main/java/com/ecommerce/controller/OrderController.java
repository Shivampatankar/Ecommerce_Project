package com.ecommerce.controller;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.OrderResponseDTO;
import com.ecommerce.service.OrderService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;


@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

//    private final RazorpayClient razorpayClient;

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
//        this.razorpayClient = razorpayClient;
    }

    @PostMapping("/place/{userId}")
    public ResponseEntity<?> placeOrder(@PathVariable Long userId,@RequestBody Map<String,Object> obj) throws  Exception {
    	Double amm=Double.parseDouble(obj.get("amount").toString());
    	RazorpayClient r=new RazorpayClient("rzp_test_RmRzXWbFCKS1fx","PUCWp4sYJ8jEjq2MrEek3tuK");
    			JSONObject options = new JSONObject();
    			
    	options.put("amount", (int) Math.round(amm * 100));
    	options.put("currency", "INR");
    	options.put("receipt", "txn_123456");
    	Order order	 = r.Orders.create(options);
    	System.out.println(order);
    	
        OrderResponseDTO ord = service.placeOrder(userId);
        return ResponseEntity.ok(order.toString());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> getUserOrders(@PathVariable Long userId) {
        List<OrderResponseDTO> orders = service.getUserOrders(userId);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/admin/all")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        List<OrderResponseDTO> orders = service.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponseDTO> updateOrderStatus(
            @PathVariable Long orderId, 
            @RequestParam String status) {
        OrderResponseDTO order = service.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(order);
    }


}
