package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.Waiter;
import com.java.gastrotalentapp.model.entity.criteria.WaiterSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.WaiterPage;
import com.java.gastrotalentapp.requests_responses.requests.WaiterRequest;
import com.java.gastrotalentapp.service.WaiterService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/waiters")
@Api(tags = "Waiter Controller", description = "Operations related to waiters")
public class WaiterController {

  private final WaiterService waiterService;

  @GetMapping
  @ApiOperation(value = "Get Waiters", notes = "Retrieve a paginated list of waiters based on search criteria")
  public ResponseEntity<Page<Waiter>> getWaiters(
          @ApiParam(value = "Page information", required = true) WaiterPage waiterPage,
          @ApiParam(value = "Search criteria", required = true) WaiterSearchCriteria waiterSearchCriteria) {
    return new ResponseEntity<>(waiterService.getWaiters(waiterPage, waiterSearchCriteria), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Get Waiter by ID", notes = "Retrieve information about a waiter by their ID")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Waiter found"),
          @ApiResponse(code = 404, message = "Waiter not found")
  })
  public ResponseEntity<Waiter> getWaiterById(
          @ApiParam(value = "ID of the waiter", required = true) @PathVariable Long id) {
    return waiterService
            .getWaiterById(id)
            .map(waiter -> new ResponseEntity<>(waiter, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @ApiOperation(value = "Create Waiter", notes = "Create a new waiter")
  @ApiResponses(value = {
          @ApiResponse(code = 201, message = "Waiter created"),
          @ApiResponse(code = 400, message = "Bad Request - Invalid input data")
  })
  public ResponseEntity<Waiter> createWaiter(
          @ApiParam(value = "Waiter details for creation", required = true) @RequestBody WaiterRequest request) {
    Waiter createdWaiter = waiterService.createWaiter(request);
    if (createdWaiter != null) {
      return new ResponseEntity<>(createdWaiter, HttpStatus.CREATED);
    } else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Update Waiter", notes = "Update information about a waiter by their ID")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Waiter updated"),
          @ApiResponse(code = 400, message = "Bad Request - Invalid input data"),
          @ApiResponse(code = 404, message = "Waiter not found")
  })
  public ResponseEntity<Waiter> updateWaiter(
          @ApiParam(value = "ID of the waiter", required = true) @PathVariable Long id,
          @ApiParam(value = "Updated waiter details", required = true) @RequestBody WaiterRequest request) {
    Waiter updatedWaiter = waiterService.updateWaiter(id, request);
    if (updatedWaiter != null) {
      return new ResponseEntity<>(updatedWaiter, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Delete Waiter", notes = "Delete a waiter by their ID")
  @ApiResponses(value = {
          @ApiResponse(code = 204, message = "Waiter deleted"),
          @ApiResponse(code = 404, message = "Waiter not found")
  })
  public ResponseEntity<Void> deleteWaiter(
          @ApiParam(value = "ID of the waiter", required = true) @PathVariable Long id) {
    if (waiterService.deleteWaiter(id)) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}