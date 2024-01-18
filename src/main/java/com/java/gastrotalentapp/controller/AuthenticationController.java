package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.requests_responses.requests.AuthenticationRequest;
import com.java.gastrotalentapp.requests_responses.requests.RegisterRequest;
import com.java.gastrotalentapp.requests_responses.responses.AuthenticationResponse;
import com.java.gastrotalentapp.service.AuthenticationService;
import javax.validation.Valid;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
@Validated
@Api(
        tags = "Authentitacion Controller",
        description = "Endpoints for user authentication and registration")
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @PostMapping("/register")
  @ApiOperation(value = "User Registration", notes = "Register a new user account")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Registration successful"),
          @ApiResponse(code = 400, message = "Bad Request - Invalid input data"),
  })
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authenticationService.register(request));
  }

  @PostMapping("/authenticate")
  @ApiOperation(value = "User Authentication", notes = "Authenticate and obtain an access token")
  @ApiResponses(value = {
          @ApiResponse(code = 200, message = "Authentication successful"),
          @ApiResponse(code = 403, message = "Forbidden - Invalid credentials"),
  })
  public ResponseEntity<AuthenticationResponse> authenticate(
          @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }
}