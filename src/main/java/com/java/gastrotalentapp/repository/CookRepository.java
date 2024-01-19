package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.model.entity.Cook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CookRepository extends JpaRepository<Cook, Long> {

     Optional<Cook> findByEmpId(Long id);
}
