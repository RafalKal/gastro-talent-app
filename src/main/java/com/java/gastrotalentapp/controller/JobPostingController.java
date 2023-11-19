package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.JobPosting;
import com.java.gastrotalentapp.service.JobPostingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/job_postings")
public class JobPostingController {

  private final JobPostingService jobPostingService;

  @GetMapping
  public ResponseEntity<List<JobPosting>> getJobPostings() {
    return new ResponseEntity<>(jobPostingService.getJobPostings(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<JobPosting> getJobPostingById(@PathVariable Long id) {
    return jobPostingService
        .getJobPostingById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteJobPosting(@PathVariable Long id) {
    return jobPostingService
        .getJobPostingById(id)
        .map(
            jobPosting -> {
              jobPostingService.deleteJobPosting(id);
              return ResponseEntity.ok().build();
            })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
