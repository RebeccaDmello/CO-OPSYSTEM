package com.coopsystem.coop.models;

import javax.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "skills")
	private String skills;

	@Column(name = "description")
	private String description;

	@Column(name = "attributes")
	private String attributes;

	@Column(name = "qualification")
	private String qualification;

	@Column(name = "experience")
	private String experience;

	@Column(name = "salpackage")
	private String salpackage;

	@Column(name = "positions")
	private String positions;

	@Column(name = "status")
	private String status;

	@Column(name = "companyname")
	private String companyname;

	@Column(name = "address")
	private String address;

	@Column(name = "hrname")
	private String hrname;

	@Column(name = "contact1")
	private String contact1;

	@Column(name = "contact2")
	private String contact2;

	@Column(name = "email")
	private String email;

	@Column(name = "website")
	private String website;

	@Column(name = "field")
	private String field;

	public Job() {

	}

	public Job(String title, String skills, String description, String attributes, String qualification,
			   String experience, String salpackage, String positions, String status, String companyname, String address,
			   String hrname, String contact1, String contact2, String email, String website, String field) {
		super();
		this.title = title;
		this.skills = skills;
		this.description = description;
		this.attributes = attributes;
		this.qualification = qualification;
		this.experience = experience;
		this.salpackage = salpackage;
		this.positions = positions;
		this.status = status;
		this.companyname = companyname;
		this.address = address;
		this.hrname = hrname;
		this.contact1 = contact1;
		this.contact2 = contact2;
		this.email = email;
		this.website = website;
		this.field = field;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAttributes() {
		return attributes;
	}

	public void setAttributes(String attributes) {
		this.attributes = attributes;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getSalpackage() {
		return salpackage;
	}

	public void setSalpackage(String salpackage) {
		this.salpackage = salpackage;
	}

	public String getPositions() {
		return positions;
	}

	public void setPositions(String positions) {
		this.positions = positions;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getHrname() {
		return hrname;
	}

	public void setHrname(String hrname) {
		this.hrname = hrname;
	}

	public String getContact1() {
		return contact1;
	}

	public void setContact1(String contact1) {
		this.contact1 = contact1;
	}

	public String getContact2() {
		return contact2;
	}

	public void setContact2(String contact2) {
		this.contact2 = contact2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}
}