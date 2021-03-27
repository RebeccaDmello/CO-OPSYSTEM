package com.coopsystem.coop.repository;

import com.coopsystem.coop.models.UserDetl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetlRepository extends JpaRepository<UserDetl, Integer> {
    Optional<UserDetl> findBySid(Integer id);

	/*Optional<UserDetl> findByUsername(String username);

	/*Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);*/
}
