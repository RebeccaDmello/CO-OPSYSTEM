package com.coopsystem.coop.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(	name = "studentdetails" )
public class UserDetl {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "sid")
	private Integer sid;

	@Column(name = "fname")
	private String fname;

	@Column(name = "lname")
	private String lname;

	@Column(name = "contact")
	private String contact;

	@Column(name = "address")
	private String address;

	@Column(name = "course")
	private String course;

	@Column(name = "international")
	private String international;

	@Column(name = "workpermit")
	private String workpermit;

	@Column(name = "skills")
	private String skills;

	@Column(name = "resume")
	private String resume;

	@Column(name = "totalexperience")
	private String totalexperience;

	/*@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "studentedudetails",
			joinColumns = @JoinColumn(name = "sid"))
	private Set<Education> education = new HashSet<>();*/

	public UserDetl() {

	}

	public UserDetl(String fname, String lname, String contact, String address, String course, String international, String workpermit, String skills, String resume, String totalexperience) {
		this.fname = fname;
		this.lname = lname;
		this.contact = contact;
		this.address = address;
		this.course = course;
		this.international = international;
		this.workpermit = workpermit;
		this.skills = skills;
		this.resume = resume;
		this.totalexperience = totalexperience;
	}

//	public UserDetl(String username, String email, String password, boolean access, boolean status) {
//		this.username = username;
//		this.email = email;
//		this.password = password;
//		this.access = access;
//		this.status = status;
//	}


	public Integer getSid() {
		return sid;
	}

	public void setSid(Integer sid) {
		this.sid = sid;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getInternational() {
		return international;
	}

	public void setInternational(String international) {
		this.international = international;
	}

	public String getWorkpermit() {
		return workpermit;
	}

	public void setWorkpermit(String workpermit) {
		this.workpermit = workpermit;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	/*public Set<Education> getEducation() {
		return education;
	}

	public void setEducation(Set<Education> education) {
		this.education = education;
	}*/

	public String getTotalexperience() {
		return totalexperience;
	}

	public void setTotalexperience(String totalexperience) {
		this.totalexperience = totalexperience;
	}
}
