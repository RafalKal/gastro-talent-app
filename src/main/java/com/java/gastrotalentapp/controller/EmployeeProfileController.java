package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.EmployeeProfile;
import com.java.gastrotalentapp.service.EmployeeProfileService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employeeProfiles")
public class EmployeeProfileController {

  private final EmployeeProfileService employeeProfileService;

  @GetMapping
  public ResponseEntity<List<EmployeeProfile>> getAllEmployees() {
    List<EmployeeProfile> employees = employeeProfileService.getAllEmployeeProfiles();
    return new ResponseEntity<>(employees, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<EmployeeProfile> getEmployeeProfileById(@PathVariable Long id) {
    return employeeProfileService
        .getEmployeeProfileById(id)
        .map(employeeProfile -> new ResponseEntity<>(employeeProfile, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  //  @PostMapping
  //  public ResponseEntity<EmployeeProfile> createCook(@RequestBody EmployeeProfileRequest request)
  // {
  //    Cook createdCook = employeeProfileService.createEmployeeProfile(request);
  //    if (createdCook != null) {
  //      return new ResponseEntity<>(createdCook, HttpStatus.CREATED);
  //    } else {
  //      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  //    }
  //  }
  //
  //  @PutMapping("/{id}")
  //  public ResponseEntity<Cook> updateCook(@PathVariable Long id, @RequestBody CookRequest
  // request) {
  //    Cook updatedCook = employeeProfileService.updateEmployeeProfile(id, request);
  //    if (updatedCook != null) {
  //      return new ResponseEntity<>(updatedCook, HttpStatus.OK);
  //    } else {
  //      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  //    }
  //  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteWaiter(@PathVariable Long id) {
    if (employeeProfileService.deleteEmployeeProfile(id)) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
