package com.coopsystem.coop.controllers;

import com.coopsystem.coop.exception.ResourceNotFoundException;
import com.coopsystem.coop.models.ERole;
import com.coopsystem.coop.models.Role;
import com.coopsystem.coop.models.User;
import com.coopsystem.coop.repository.RoleRepository;
import com.coopsystem.coop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	// get all users
	@GetMapping("/adusers")
	public List<User> getAllUsers() {

		return userRepository.findAll();
	}

	// create user rest api
	@PostMapping("/adusers")
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	// get user by id rest api
	@GetMapping("/adusers/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		return ResponseEntity.ok(user);
	}

	// update user rest api
	@PutMapping("/adusers/{id}")
	public ResponseEntity <User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));



		//Set<String> strRoles = signupRequest.getRole();
		Set<Role> roles = userDetails.getRoles();
		System.out.println(roles);
		if (roles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} /*else {
			roles.forEach(role -> {
				switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);
						break;
//				case "mod":
//					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					roles.add(modRole);
//
//					break;
					default:
						Role userRole = roleRepository.findByName(ERole.ROLE_USER)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(userRole);
				}
			});
		}*/

		//user.setRoles(roles);
		//userRepository.save(user);



		user.setUsername(userDetails.getUsername());
		user.setEmail(userDetails.getEmail());
		user.setAccess(userDetails.isAccess());
		user.setStatus(userDetails.isStatus());
		user.setRoles(roles);

		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}

	// delete user rest api
	@DeleteMapping("/adusers/{id}")
	public ResponseEntity < Map < String, Boolean >> deleteUser(@PathVariable Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

		userRepository.delete(user);
		Map < String, Boolean > response = new HashMap < > ();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}