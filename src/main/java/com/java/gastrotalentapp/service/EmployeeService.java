package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.Employee;
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

  public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  public Employee getEmployeeById(Long id) {
    return employeeRepository.findById(id).orElse(null);
  }

  public Employee saveEmployee(Employee employee) {
    return employeeRepository.save(employee);
  }

  public void deleteEmployee(Long id) {
    employeeRepository.deleteById(id);
  }
}
