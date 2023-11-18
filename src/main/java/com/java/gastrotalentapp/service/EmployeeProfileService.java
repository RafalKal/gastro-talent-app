package com.java.gastrotalentapp.service;

//import com.java.gastrotalentapp.builders.CookBuilder;
import com.java.gastrotalentapp.builders.CookBuilder;
import com.java.gastrotalentapp.model.entity.Cook;
import com.java.gastrotalentapp.model.entity.EmployeeProfile;
//import com.java.gastrotalentapp.repository.CookRepository;
import com.java.gastrotalentapp.repository.EmployeeProfileRepository;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
import java.util.List;
import java.util.Optional;

import com.java.gastrotalentapp.requests_responses.requests.EmployeeProfileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeProfileService {

  private final EmployeeProfileRepository employeeProfileRepository;
  private final UserRepository userRepository;

  public List<EmployeeProfile> getAllEmployeeProfiles() {
    return employeeProfileRepository.findAll();
  }

  public Optional<EmployeeProfile> getEmployeeProfileById(Long id) {
    return employeeProfileRepository.findById(id);
  }

  public boolean deleteEmployeeProfile(Long id) {
    if (employeeProfileRepository.existsById(id)) {
      employeeProfileRepository.deleteById(id);
      return true;
    } else {
      return false;
    }
  }
}
