package com.coopsystem.coop.repository;

import com.coopsystem.coop.models.Education;
//import com.coopsystem.coop.models.UserDetl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducationRepository extends JpaRepository<Education, Integer> {
	//Optional<Education> findBySid(UserDetl sid);
	Optional<Education> findById(Integer id);
	Optional<Education> findBySid(Integer sid);

	List<Education> findAllBySid(Integer sid);
}
