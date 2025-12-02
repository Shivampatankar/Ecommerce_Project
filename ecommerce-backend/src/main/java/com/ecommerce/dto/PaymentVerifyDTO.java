package com.ecommerce.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentVerifyDTO {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private Long userId;
}
