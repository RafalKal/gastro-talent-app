package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo-controller")
@RequiredArgsConstructor
public class DemoController {

  private final AuthenticationService authenticationService;

  @GetMapping
  public ResponseEntity<String> sayHello() {
    return ResponseEntity.ok("Hello form secured endpoint");
  }
}
