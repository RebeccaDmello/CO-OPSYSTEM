package com.coopsystem.coop.controllers;

import com.coopsystem.coop.exception.ResourceNotFoundException;
import com.coopsystem.coop.models.Job;
import com.coopsystem.coop.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class JobController {

	@Autowired
	private JobRepository jobRepository;

	// get all jobs
	@GetMapping("/jobs")
	public List<Job> getAllJobs() {
		//System.out.println("Req from react");
		return jobRepository.findAll();
	}

	// create job rest api
	@PostMapping("/jobs")
	public Job createJob(@RequestBody Job job) {
		System.out.println(job.getField());
		return jobRepository.save(job);
	}

	// get job by id rest api
	@GetMapping("/jobs/{id}")
	public ResponseEntity<Job> getJobById(@PathVariable Long id) {
		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not exist with id :" + id));
		return ResponseEntity.ok(job);
	}

	// update job rest api
	@PutMapping("/jobs/{id}")
	public ResponseEntity <Job> updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not exist with id :" + id));

		job.setTitle(jobDetails.getTitle());
		job.setSkills(jobDetails.getSkills());
		job.setAddress(jobDetails.getAddress());
		job.setAttributes(jobDetails.getAttributes());
		job.setCompanyname(jobDetails.getCompanyname());
		job.setContact1(jobDetails.getContact1());
		job.setContact2(jobDetails.getContact2());
		job.setDescription(jobDetails.getDescription());
		job.setExperience(jobDetails.getExperience());
		job.setHrname(jobDetails.getHrname());
		job.setEmail(jobDetails.getEmail());
		job.setQualification(jobDetails.getQualification());
		job.setSalpackage(jobDetails.getSalpackage());
		job.setPositions(jobDetails.getPositions());
		job.setStatus(jobDetails.getStatus());
		job.setWebsite(jobDetails.getWebsite());
		job.setField(jobDetails.getField());

		Job updatedJob = jobRepository.save(job);
		return ResponseEntity.ok(updatedJob);
	}

	// delete job rest api
	@DeleteMapping("/jobs/{id}")
	public ResponseEntity < Map < String, Boolean >> deleteJob(@PathVariable Long id) {
		Job job = jobRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Job not exist with id :" + id));

		jobRepository.delete(job);
		Map < String, Boolean > response = new HashMap < > ();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}