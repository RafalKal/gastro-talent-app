package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.model.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {}
