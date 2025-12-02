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
public class ProductResponseDTO {
	
	private Long id;
	
	private String productName;

	private String productDescription;

	private double productPrice;

	private int stock;

	private String productImageUrl;
	
	private String categoryName;

}
