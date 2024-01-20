package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.service.EmployeeService;
import java.util.List;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@Api(tags = "Employee controller", description = "Operations related to employee entities")
public class EmployeeController {

  private final EmployeeService employeeService;

  @GetMapping
  @ApiOperation(value = "Get All Employees", notes = "Retrieve a list of all employees")
  public ResponseEntity<List<Employee>> getAllEmployees() {
    List<Employee> employees = employeeService.getAllEmployees();
    return ResponseEntity.ok(employees);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Get Employee by ID", notes = "Retrieve information about an employee by their ID")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Employee found"),
          @ApiResponse(code = 404, message = "Employee not found")
  })
  public ResponseEntity<Employee> getEmployeeById(
          @ApiParam(value = "ID of the employee", required = true) @PathVariable Long id) {
    return employeeService
            .getEmployeeById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }

//  @PostMapping
//  @ApiOperation(value = "Create Employee", notes = "Create a new employee")
//  @ApiResponses(value = {
//          @ApiResponse(code = 201, message = "Employee created"),
//          @ApiResponse(code = 400, message = "Bad Request - Invalid input data")
//  })
//  public ResponseEntity<Employee> createEmployee(
//          @ApiParam(value = "Employee details", required = true) @RequestBody Employee employee) {
//    Employee savedEmployee = employeeService.saveEmployee(employee);
//    return ResponseEntity.ok(savedEmployee);
//  }

//  @PutMapping("/{id}")
//  @ApiOperation(value = "Update Employee", notes = "Update information about an employee by their ID")
//  @ApiResponses(value = {
//          @ApiResponse(code = 200, message = "Employee updated"),
//          @ApiResponse(code = 400, message = "Bad Request - Invalid input data"),
//          @ApiResponse(code = 404, message = "Employee not found")
//  })
//  public ResponseEntity<Employee> updateEmployee(
//          @ApiParam(value = "ID of the employee", required = true) @PathVariable Long id,
//          @ApiParam(value = "Updated employee details", required = true) @RequestBody Employee employee) {
//    return employeeService
//            .getEmployeeById(id)
//            .map(
//                    existingEmployee -> {
//                      employee.setId(existingEmployee.getId());
//                      Employee updatedEmployee = employeeService.saveEmployee(employee);
//                      return ResponseEntity.ok(updatedEmployee);
//                    })
//            .orElseGet(() -> ResponseEntity.notFound().build());
//  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Delete Employee", notes = "Delete an employee by their ID")
  @ApiResponses(value = {
          @ApiResponse(code = 204, message = "Employee deleted"),
          @ApiResponse(code = 404, message = "Employee not found")
  })
  public ResponseEntity<Void> deleteEmployee(
          @ApiParam(value = "ID of the employee", required = true) @PathVariable Long id) {
    employeeService.deleteEmployee(id);
    return ResponseEntity.ok().build();
  }
}