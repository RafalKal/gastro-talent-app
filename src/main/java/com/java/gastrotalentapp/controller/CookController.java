package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.Cook;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
import com.java.gastrotalentapp.service.CookService;
import java.util.List;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/cooks")
@Api(tags = "Cook Controller", description = "Endpoints for managing cook entities")
public class CookController {

  private final CookService cookService;
  private final UserRepository userRepository;

  @GetMapping
  @ApiOperation(value = "Get All Cooks", notes = "Retrieve a list of all cooks")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Cooks found"),
        @ApiResponse(code = 404, message = "Cooks not found")
      })
  public ResponseEntity<List<Cook>> getAllCooks() {
    List<Cook> cooks = cookService.getAllCooks();
    return new ResponseEntity<>(cooks, HttpStatus.OK);
  }

  @GetMapping("/is-visible")
  @ApiOperation(value = "Get All Visible Cooks", notes = "Retrieve a list of visible cooks")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Cooks found"),
        @ApiResponse(code = 404, message = "Cooks not found")
      })
  public ResponseEntity<List<Cook>> getAllVisibleCooks() {
    List<Cook> cooks = cookService.getAllVisibleCooks();
    return new ResponseEntity<>(cooks, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Get Cook by ID", notes = "Retrieve information about a cook by their ID")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Cook found"),
        @ApiResponse(code = 404, message = "Cook not found")
      })
  public ResponseEntity<Cook> getCookById(
      @ApiParam(value = "ID of the cook", required = true) @PathVariable Long id) {
    return cookService
        .getCookById(id)
        .map(cook -> new ResponseEntity<>(cook, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @GetMapping("/by-user-id/{id}")
  @ApiOperation(
      value = "Get Cook by user ID",
      notes = "Retrieve information about a cook by user ID")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Cook found"),
        @ApiResponse(code = 404, message = "Cook not found")
      })
  public ResponseEntity<Cook> getCookByUserId(
      @ApiParam(value = "ID of the user assigned to cook", required = true) @PathVariable Long id) {
    return cookService
        .getCookByUserId(id)
        .map(cook -> new ResponseEntity<>(cook, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @ApiOperation(value = "Create Cook", notes = "Create a new cook")
  @ApiResponses(
      value = {
        @ApiResponse(code = 201, message = "Cook created"),
        @ApiResponse(code = 400, message = "Bad Request - Invalid input data")
      })
  public ResponseEntity<Cook> createCook(
      @ApiParam(value = "Cook details", required = true) @RequestBody CookRequest request) {

    if (cookService.existsByUserId(request.getUserId())
        || !userRepository.existsById(request.getUserId())) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    } else {
      Cook createdCook = cookService.createCook(request);
      return new ResponseEntity<>(createdCook, HttpStatus.CREATED);
    }
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Update Cook", notes = "Update information about a cook by their ID")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Cook updated"),
        @ApiResponse(code = 400, message = "Bad Request - Invalid input data"),
        @ApiResponse(code = 404, message = "Cook not found")
      })
  public ResponseEntity<Cook> updateCook(
      @ApiParam(value = "ID of the cook", required = true) @PathVariable Long id,
      @ApiParam(value = "Updated cook details", required = true) @RequestBody CookRequest request) {
    // safety first
//    request.setUserId(id);
    if (cookService.existsById(id)) {
      Cook updatedCook = cookService.updateCook(id, request);
      return new ResponseEntity<>(updatedCook, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Delete Cook", notes = "Delete a cook by their ID")
  @ApiResponses(
      value = {
        @ApiResponse(code = 204, message = "Cook deleted"),
        @ApiResponse(code = 404, message = "Cook not found")
      })
  public ResponseEntity<Void> deleteCook(
      @ApiParam(value = "ID of the cook", required = true) @PathVariable Long id) {
    if (cookService.deleteCook(id)) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
