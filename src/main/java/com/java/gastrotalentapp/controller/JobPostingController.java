package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.JobPosting;
import com.java.gastrotalentapp.service.JobPostingService;
import java.util.List;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/job-postings")
@Api(tags = "Job Posting Controller", description = "Operations related to job postings")
public class JobPostingController {

  private final JobPostingService jobPostingService;

  @GetMapping
  @ApiOperation(value = "Get All Job Postings", notes = "Retrieve a list of all job postings")
  public ResponseEntity<List<JobPosting>> getJobPostings() {
    return new ResponseEntity<>(jobPostingService.getJobPostings(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Get Job Posting by ID", notes = "Retrieve information about a job posting by its ID")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Job posting found"),
          @ApiResponse(code = 404, message = "Job posting not found")
  })
  public ResponseEntity<JobPosting> getJobPostingById(
          @ApiParam(value = "ID of the job posting", required = true) @PathVariable Long id) {
    return jobPostingService
            .getJobPostingById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Delete Job Posting", notes = "Delete a job posting by its ID")
  @ApiResponses(value = {
          @ApiResponse(code = 204, message = "Job posting deleted"),
          @ApiResponse(code = 404, message = "Job posting not found")
  })
  public ResponseEntity<?> deleteJobPosting(
          @ApiParam(value = "ID of the job posting", required = true) @PathVariable Long id) {
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
