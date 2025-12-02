package com.ecommerce.service;

import com.ecommerce.dto.PaymentRequestDTO;
import com.ecommerce.dto.PaymentVerifyDTO;
import org.json.JSONObject;

public interface PaymentService {

    JSONObject createOrder(PaymentRequestDTO dto);

    String verifyPayment(PaymentVerifyDTO dto);
}
