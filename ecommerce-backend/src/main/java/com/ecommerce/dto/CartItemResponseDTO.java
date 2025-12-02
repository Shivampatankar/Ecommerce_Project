package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponseDTO {
	private Long id;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private double price;
    private int qty;
    
}
