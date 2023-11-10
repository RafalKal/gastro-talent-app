//package com.java.gastrotalentapp.controller;
//
//import com.java.gastrotalentapp.model.entity.EmployeeProfile;
//import com.java.gastrotalentapp.service.EmployeeProfileService;
//import java.util.List;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/v1/employeeProfiles")
//public class EmployeeProfileController {
//
//  private final EmployeeProfileService employeeProfileService;
//
//  @GetMapping
//  public ResponseEntity<List<EmployeeProfile>> getAllEmployees() {
//    List<EmployeeProfile> employees = employeeProfileService.getAllEmployeeProfiles();
//    return new ResponseEntity<>(employees, HttpStatus.OK);
//  }
//
//  @GetMapping("/{id}")
//  public ResponseEntity<EmployeeProfile> getEmployeeProfileById(@PathVariable Long id) {
//    return employeeProfileService
//        .getEmployeeProfileById(id)
//        .map(employeeProfile -> new ResponseEntity<>(employeeProfile, HttpStatus.OK))
//        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//  }
//
//  @DeleteMapping("/{id}")
//  public ResponseEntity<Void> deleteEmployeeProfile(@PathVariable Long id) {
//    if (employeeProfileService.deleteEmployeeProfile(id)) {
//      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    } else {
//      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//  }
//}
