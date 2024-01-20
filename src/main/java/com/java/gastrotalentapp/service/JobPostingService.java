//package com.java.gastrotalentapp.service;
//
//import com.java.gastrotalentapp.model.entity.JobPosting;
//import com.java.gastrotalentapp.repository.JobPostingRepository;
//import java.util.List;
//import java.util.Optional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class JobPostingService {
//
//  private final JobPostingRepository jobPostingRepository;
//
//  public List<JobPosting> getJobPostings() {
//    return jobPostingRepository.findAll();
//  }
//
//  public Optional<JobPosting> getJobPostingById(Long id) {
//    return jobPostingRepository.findById(id);
//  }
//
//  public void deleteJobPosting(Long id) {
//    jobPostingRepository.deleteById(id);
//  }
//}
