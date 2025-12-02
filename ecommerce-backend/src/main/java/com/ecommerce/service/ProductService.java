package com.ecommerce.service;

import java.util.List;

import com.ecommerce.dto.ProductRequestDTO;
import com.ecommerce.dto.ProductResponseDTO;

public interface ProductService {
	
	ProductResponseDTO addProduct(ProductRequestDTO dto);
	
	List<ProductResponseDTO> getAllProducts();
	
	ProductResponseDTO getProductById(Long id);
	
	void deleteProduct(Long id);

	ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto);

}
