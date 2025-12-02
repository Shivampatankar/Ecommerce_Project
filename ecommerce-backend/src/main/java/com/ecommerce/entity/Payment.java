package com.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment extends BaseEntity {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private double amount;

    private String status;  

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
