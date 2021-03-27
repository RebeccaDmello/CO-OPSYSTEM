package com.coopsystem.coop.controllers;

import com.coopsystem.coop.exception.ResourceNotFoundException;
import com.coopsystem.coop.models.UserDetl;
import com.coopsystem.coop.repository.UserDetlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserDetlController {

	@Autowired
	private UserDetlRepository userDetlRepository;

	// get all users
	@GetMapping("/adusersdetl")
	public List<UserDetl> getAllUsers() {
		return userDetlRepository.findAll();
	}

	// create user rest api
	@PostMapping("/adusersdetl")
	public UserDetl createUser(@RequestBody UserDetl userDetl) {
		return userDetlRepository.save(userDetl);
	}

	// get user by id rest api
	@GetMapping("/adusersdetl/{id}")
	public ResponseEntity<UserDetl> getUserById(@PathVariable Integer id) {
		UserDetl userDetl = userDetlRepository.findBySid(id)
				.orElseThrow(() -> new RuntimeException("Error: User ID is not found."));
		return ResponseEntity.ok(userDetl);
	}

	// update user rest api
	@PutMapping("/adusersdetl/{id}")
	public ResponseEntity <UserDetl> updateEmployee(@PathVariable Integer id, @RequestBody UserDetl userDetails) {
		UserDetl userDetl = userDetlRepository.findBySid(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		userDetl.setFname(userDetails.getFname());
		userDetl.setLname(userDetails.getLname());
		userDetl.setContact(userDetails.getContact());
		userDetl.setAddress(userDetails.getAddress());
		userDetl.setCourse(userDetails.getCourse());
		userDetl.setInternational(userDetails.getInternational());
		userDetl.setWorkpermit(userDetails.getWorkpermit());
		userDetl.setSkills(userDetails.getSkills());
		userDetl.setResume(userDetails.getResume());
		userDetl.setTotalexperience(userDetails.getTotalexperience());

		UserDetl updatedUser = userDetlRepository.save(userDetl);
		return ResponseEntity.ok(updatedUser);
	}

	// delete user rest api
	@DeleteMapping("/adusersdetl/{id}")
	public ResponseEntity < Map < String, Boolean >> deleteUser(@PathVariable Integer id) {
		UserDetl user = userDetlRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

		userDetlRepository.delete(user);
		Map < String, Boolean > response = new HashMap < > ();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}