package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.custom_exception.ApiException;
import com.ecommerce.custom_exception.AuthenticationException;
import com.ecommerce.custom_exception.ResourceNotFoundException;
import com.ecommerce.dto.UserDTO;
import com.ecommerce.dto.UserRequestDTO;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDTO register(UserRequestDTO dto) {
	    if(repo.existsByEmail(dto.getEmail())) {
	        throw new ApiException("Email already registered");
	    }

	    User user = mapper.map(dto, User.class);
	    user.setPassword(passwordEncoder.encode(dto.getPassword()));
	    
	    User saved = repo.save(user);
	    return mapper.map(saved, UserDTO.class);
	}

	@Override
	public UserDTO login(String email, String password) {
	    User user = repo.findByEmail(email)
	            .orElseThrow(() -> new AuthenticationException("Invalid credentials"));

	    if(!passwordEncoder.matches(password, user.getPassword())) {
	        throw new AuthenticationException("Invalid credentials");
	    }

	    return mapper.map(user, UserDTO.class);
	}

	@Override
	public UserDTO getUserById(Long id) {
		User user = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		return mapper.map(user, UserDTO.class);
	}
	@Override
	public List<UserDTO> getAllUsers() {
	    return repo.findAll().stream()
	        .map(user -> mapper.map(user, UserDTO.class))
	        .collect(Collectors.toList());
	}

	@Override
	public UserDTO updateUserRole(Long id, String newRole) {
	    User user = repo.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
	    user.setUserRole(Role.valueOf(newRole));
	    User updated = repo.save(user);
	    return mapper.map(updated, UserDTO.class);
	}

	@Override
	public void deleteUser(Long id) {
	    if (!repo.existsById(id)) {
	        throw new ResourceNotFoundException("User not found with id: " + id);
	    }
	    repo.deleteById(id);
	}

}
