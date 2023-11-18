package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.entity.Employer;
import com.java.gastrotalentapp.repository.EmployerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployerService {

  private final EmployerRepository employerRepository;

  public List<Employer> getAllEmployers() {
    return employerRepository.findAll();
  }

  public Optional<Employer> getEmployerById(Long id) {
    return employerRepository.findById(id);
  }

  public Employer saveEmployer(Employer employer) {
    return employerRepository.save(employer);
  }

  public void deleteEmployer(Long id) {
    employerRepository.deleteById(id);
  }
}
