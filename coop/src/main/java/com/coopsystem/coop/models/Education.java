package com.coopsystem.coop.models;

import javax.persistence.*;

@Entity
@Table(name = "studentedudetails")
public class Education {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer education_id;

	@Column(name = "sid")
	private Integer sid;

	@Column(name = "education")
	private String education;

	@Column(name = "specialization")
	private String specialization;

	@Column(name = "university")
	private String university;

	@Column(name = "cgpa")
	private String cgpa;

	@Column(name = "doj")
	private String doj;

	@Column(name = "doc")
	private String doc;

	public Education() {

	}

	public Education(Integer sid, String education, String specialization, String university, String cgpa, String doj, String doc) {
		this.sid = sid;
		this.education = education;
		this.specialization = specialization;
		this.university = university;
		this.cgpa = cgpa;
		this.doj = doj;
		this.doc = doc;
	}

	public Integer getEducation_id() {
		return education_id;
	}

	public void setEducation_id(Integer education_id) {
		this.education_id = education_id;
	}

	public Integer getSid() {
		return sid;
	}

	public void setSid(Integer sid) {
		this.sid = sid;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public String getCgpa() {
		return cgpa;
	}

	public void setCgpa(String cgpa) {
		this.cgpa = cgpa;
	}

	public String getDoj() {
		return doj;
	}

	public void setDoj(String doj) {
		this.doj = doj;
	}

	public String getDoc() {
		return doc;
	}

	public void setDoc(String doc) {
		this.doc = doc;
	}
}