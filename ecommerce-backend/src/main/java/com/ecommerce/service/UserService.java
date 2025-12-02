package com.ecommerce.service;

import java.util.List;

import com.ecommerce.dto.UserDTO;
import com.ecommerce.dto.UserRequestDTO;

public interface UserService {
	UserDTO register(UserRequestDTO dto);
	
	UserDTO login(String email,String password);
	
	UserDTO getUserById(Long id);
	
	List<UserDTO> getAllUsers();
	
	UserDTO updateUserRole(Long id, String newRole);
	
	void deleteUser(Long id);



}
