package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.custom_exception.ResourceNotFoundException;
import com.ecommerce.dto.ProductRequestDTO;
import com.ecommerce.dto.ProductResponseDTO;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepo;
	private final CategoryRepository categoryRepo;
	private final ModelMapper mapper;
	
	public ProductServiceImpl(ProductRepository productRepo, CategoryRepository categoryRepo, ModelMapper mapper) {
		this.productRepo = productRepo;
		this.categoryRepo = categoryRepo;
		this.mapper = mapper;
	}
	
	@Override
	public ProductResponseDTO addProduct(ProductRequestDTO dto) {
	    Category category = categoryRepo.findById(dto.getCategoryId())
	            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

	    Product product = new Product();
	    product.setProductName(dto.getProductName());
	    product.setProductDescription(dto.getProductDescription());
	    product.setProductPrice(dto.getProductPrice());
	    product.setStock(dto.getStock());
	    product.setProductImageUrl(dto.getProductImageUrl());
	    product.setCategory(category);

	    Product saved = productRepo.save(product);

	    ProductResponseDTO response = new ProductResponseDTO();
	    response.setId(saved.getId());
	    response.setProductName(saved.getProductName());
	    response.setProductDescription(saved.getProductDescription());
	    response.setProductPrice(saved.getProductPrice());
	    response.setStock(saved.getStock());
	    response.setProductImageUrl(saved.getProductImageUrl());
	    response.setCategoryName(category.getName());

	    return response;
	}



	@Override
	public List<ProductResponseDTO> getAllProducts() {
		return productRepo.findAll()
				.stream()
				.map(this::mapToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public ProductResponseDTO getProductById(Long id) {
		Product product = productRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

		return mapToResponseDTO(product);
	}

	private ProductResponseDTO mapToResponseDTO(Product product) {
		ProductResponseDTO dto = mapper.map(product, ProductResponseDTO.class);
		dto.setCategoryName(product.getCategory().getName());
		return dto;
	}
	
	@Override
	public ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto) {
	    Product product = productRepo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
	    
	    Category category = categoryRepo.findById(dto.getCategoryId())
	            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

	    product.setProductName(dto.getProductName());
	    product.setProductDescription(dto.getProductDescription());
	    product.setProductPrice(dto.getProductPrice());
	    product.setStock(dto.getStock());
	    product.setProductImageUrl(dto.getProductImageUrl());
	    product.setCategory(category);

	    Product saved = productRepo.save(product);

	    ProductResponseDTO response = new ProductResponseDTO();
	    response.setId(saved.getId());
	    response.setProductName(saved.getProductName());
	    response.setProductDescription(saved.getProductDescription());
	    response.setProductPrice(saved.getProductPrice());
	    response.setStock(saved.getStock());
	    response.setProductImageUrl(saved.getProductImageUrl());
	    response.setCategoryName(category.getName());

	    return response;
	}

	@Override
	public void deleteProduct(Long id) {
	    productRepo.deleteById(id);
	}

	


}
