package com.ecommerce.service;

import java.util.List;

import com.ecommerce.dto.CategoryRequestDTO;
import com.ecommerce.dto.CategoryResponseDTO;
import com.ecommerce.entity.Category;

public interface CategoryService {
	CategoryResponseDTO addCategory(CategoryRequestDTO dto);
	List<CategoryResponseDTO> getAllCategories();
	CategoryResponseDTO updateCategoryAsDTO(Long id, CategoryRequestDTO dto);

	CategoryResponseDTO getCategoryByIdAsDTO(Long id);
	
	void deleteCategory(Long id);




}
