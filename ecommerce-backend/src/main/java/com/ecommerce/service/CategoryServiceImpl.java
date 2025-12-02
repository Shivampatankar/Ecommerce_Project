package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.ecommerce.custom_exception.ResourceNotFoundException;
import com.ecommerce.dto.CategoryRequestDTO;
import com.ecommerce.dto.CategoryResponseDTO;
import com.ecommerce.entity.Category;
import com.ecommerce.repository.CategoryRepository;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository repo;
	private final ModelMapper mapper;

	public CategoryServiceImpl(CategoryRepository repo, ModelMapper mapper) {
		this.repo = repo;
		this.mapper = mapper;
	}

	@Override
	public CategoryResponseDTO addCategory(CategoryRequestDTO dto) {
		Category category = mapper.map(dto, Category.class);
		Category saved = repo.save(category);
		return mapper.map(saved, CategoryResponseDTO.class);
	}

	@Override
	public List<CategoryResponseDTO> getAllCategories() {
		return repo.findAll().stream().map(cat -> mapper.map(cat, CategoryResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public CategoryResponseDTO updateCategoryAsDTO(Long id, CategoryRequestDTO dto) {
	    Category existing = repo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
	    existing.setName(dto.getName());
	    existing.setDiscription(dto.getDiscription());
	    Category saved = repo.save(existing);
	    return mapper.map(saved, CategoryResponseDTO.class);
	}


	@Override
	public CategoryResponseDTO getCategoryByIdAsDTO(Long id) {
	    Category category = repo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
	    return mapper.map(category, CategoryResponseDTO.class);
	}
	@Override
	public void deleteCategory(Long id) {
	  repo.deleteById(id);
	}




}
