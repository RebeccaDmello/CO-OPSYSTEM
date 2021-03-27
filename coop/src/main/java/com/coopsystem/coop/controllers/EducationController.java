package com.coopsystem.coop.controllers;

import com.coopsystem.coop.exception.ResourceNotFoundException;
import com.coopsystem.coop.models.Education;
import com.coopsystem.coop.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EducationController {

	@Autowired
	private EducationRepository educationRepository;

	// get all educations
	@GetMapping("/education")
	public List<Education> getAllEducations() {
		//System.out.println("Req from react");
		return educationRepository.findAll();
	}

	// create education rest api
	@PostMapping("/education")
	public Education createEducation(@RequestBody Education education) {
		System.out.println(education.getSid());
		return educationRepository.save(education);
	}

	// get education by id rest api
	@GetMapping("/edubyid/{id}")
	public ResponseEntity<Education> getEducationById(@PathVariable Integer id) {
		Education education = educationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not exist with id :" + id));
		return ResponseEntity.ok(education);
	}

	// get education by id rest api
	@GetMapping("/education/{id}")
	public List<Education> getEducationBySid(@PathVariable Integer id) {
		List<Education> education = educationRepository.findAllBySid(id);
		return education;
	}

	// update education rest api
	@PutMapping("/education/{id}")
	public ResponseEntity <Education> updateEducation(@PathVariable Integer id, @RequestBody Education educationDetails) {
		Education education = educationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Education not exist with id :" + id));

		education.setEducation(educationDetails.getEducation());
		education.setSpecialization(educationDetails.getSpecialization());
		education.setCgpa(educationDetails.getCgpa());
		education.setDoj(educationDetails.getDoj());
		education.setDoc(educationDetails.getDoc());
		education.setUniversity(educationDetails.getUniversity());
		education.setSid(educationDetails.getSid());

		Education updatedEducation = educationRepository.save(education);
		return ResponseEntity.ok(updatedEducation);
	}

	// delete education rest api
	@DeleteMapping("/education/{id}")
	public ResponseEntity < Map < String, Boolean >> deleteEducation(@PathVariable Integer id) {
		Education education = educationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Education not exist with id :" + id));

		educationRepository.delete(education);
		Map < String, Boolean > response = new HashMap < > ();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}