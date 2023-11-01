package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.EmployeeProfile;
import com.java.gastrotalentapp.service.EmployeeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
  private final EmployeeService employeeService;

  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping("/")
  public List<EmployeeProfile> getAllEmployees() {
    return employeeService.getAllEmployees();
  }

  @GetMapping("/{id}")
  public EmployeeProfile getEmployeeById(@PathVariable Long id) {
    return employeeService.getEmployeeById(id);
  }

  @PostMapping("/")
  public EmployeeProfile addEmployee(@RequestBody EmployeeProfile employeeProfile) {
    return employeeService.saveEmployee(employeeProfile);
  }

  @PutMapping("/{id}")
  public EmployeeProfile updateEmployee(
      @PathVariable Long id, @RequestBody EmployeeProfile employeeProfile) {
    employeeProfile.setId(id);
    return employeeService.saveEmployee(employeeProfile);
  }

  @DeleteMapping("/{id}")
  public void deleteEmployee(@PathVariable Long id) {
    employeeService.deleteEmployee(id);
  }
}
