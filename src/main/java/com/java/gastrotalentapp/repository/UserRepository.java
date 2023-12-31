package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.model.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  Optional<User> findById(Long id);

  boolean existsByEmail(String email);
}
