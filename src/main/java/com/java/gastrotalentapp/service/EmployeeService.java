package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.entity.EmployeeProfile;
import com.java.gastrotalentapp.repository.EmployeeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
  private final EmployeeRepository employeeRepository;

  @Autowired
  public EmployeeService(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public List<EmployeeProfile> getAllEmployees() {
    return employeeRepository.findAll();
  }

  public EmployeeProfile getEmployeeById(Long id) {
    return employeeRepository.findById(id).orElse(null);
  }

  public EmployeeProfile saveEmployee(EmployeeProfile employeeProfile) {
    return employeeRepository.save(employeeProfile);
  }

  public void deleteEmployee(Long id) {
    employeeRepository.deleteById(id);
  }
}
