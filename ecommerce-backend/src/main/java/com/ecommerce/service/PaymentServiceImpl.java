package com.ecommerce.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.dto.PaymentRequestDTO;
import com.ecommerce.dto.PaymentVerifyDTO;
import com.ecommerce.entity.Payment;
import com.ecommerce.entity.User;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepo;
    private final UserRepository userRepo;

    public PaymentServiceImpl(RazorpayClient razorpayClient,
                              PaymentRepository paymentRepo,
                              UserRepository userRepo) {
        this.razorpayClient = razorpayClient;
        this.paymentRepo = paymentRepo;
        this.userRepo = userRepo;
    }

    @Override
    public JSONObject createOrder(PaymentRequestDTO dto) {

        try {
            JSONObject options = new JSONObject();
            options.put("amount", dto.getAmount() * 100); // paise
            options.put("currency", "INR");
            options.put("receipt", "order_rcpt_" + System.currentTimeMillis());

            Order order = razorpayClient.Orders.create(options);


            User user = userRepo.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Payment payment = Payment.builder()
                    .razorpayOrderId(order.get("id"))
                    .amount(dto.getAmount())
                    .status("CREATED")
                    .user(user)
                    .build();

            paymentRepo.save(payment);

            return order.toJson();

        } catch (RazorpayException e) {
            throw new RuntimeException("Razorpay Error: " + e.getMessage());
        }
    }



    @Override
    public String verifyPayment(PaymentVerifyDTO dto) {

    	Payment payment = paymentRepo.findByRazorpayOrderId(dto.getRazorpayOrderId())
    	        .orElseThrow(() -> new RuntimeException("Payment not found"));


        payment.setRazorpayPaymentId(dto.getRazorpayPaymentId());
        payment.setRazorpaySignature(dto.getRazorpaySignature());
        payment.setStatus("SUCCESS");

        paymentRepo.save(payment);
        return "Payment Verified Successfully";
    }

}
