package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.enums.Profession;
import com.java.gastrotalentapp.model.entity.EmployeeProfile;
import com.java.gastrotalentapp.service.EmployeeProfileService;
import java.util.List;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employee-profiles")
@Api(tags = "Employee Profile Controller", description = "Operations related to employee profiles")
public class EmployeeProfileController {

  private final EmployeeProfileService employeeProfileService;

  @GetMapping
  @ApiOperation(value = "Get All Employee Profiles", notes = "Retrieve a list of all employee profiles")
  public ResponseEntity<List<EmployeeProfile>> getAllEmployeeProfiles() {
    List<EmployeeProfile> employeeProfiles = employeeProfileService.getAllEmployeeProfiles();
    return new ResponseEntity<>(employeeProfiles, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Get Employee Profile by ID", notes = "Retrieve information about an employee profile by its ID")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Employee profile found"),
          @ApiResponse(code = 404, message = "Employee profile not found")
  })
  public ResponseEntity<EmployeeProfile> getEmployeeProfileById(
          @ApiParam(value = "ID of the employee profile", required = true) @PathVariable Long id) {
    return employeeProfileService
            .getEmployeeProfileById(id)
            .map(employeeProfile -> new ResponseEntity<>(employeeProfile, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Delete Employee Profile", notes = "Delete an employee profile by its ID")
  @ApiResponses(value = {
          @ApiResponse(code = 204, message = "Employee profile deleted"),
          @ApiResponse(code = 404, message = "Employee profile not found")
  })
  public ResponseEntity<Void> deleteEmployeeProfile(
          @ApiParam(value = "ID of the employee profile", required = true) @PathVariable Long id) {
    if (employeeProfileService.deleteEmployeeProfile(id)) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

//  @GetMapping("/test/{id}")
//  public ResponseEntity<List<EmployeeProfile>> test() {
//    employeeProfileService.
//    return new ResponseEntity<>(employees, HttpStatus.OK);
//  }
}
