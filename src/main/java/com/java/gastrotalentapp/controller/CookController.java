//package com.java.gastrotalentapp.controller;
//
//import com.java.gastrotalentapp.model.entity.Cook;
//import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
//import com.java.gastrotalentapp.service.CookService;
//import java.util.List;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/v1/cooks")
//public class CookController {
//
//  private final CookService cookService;
//
//  @GetMapping
//  public ResponseEntity<List<Cook>> getAllCooks() {
//    List<Cook> cooks = cookService.getAllCooks();
//    return new ResponseEntity<>(cooks, HttpStatus.OK);
//  }
//
//  @GetMapping("/{id}")
//  public ResponseEntity<Cook> getCookById(@PathVariable Long id) {
//    return cookService
//        .getCookById(id)
//        .map(cook -> new ResponseEntity<>(cook, HttpStatus.OK))
//        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//  }
//
//  @PostMapping
//  public ResponseEntity<Cook> createCook(@RequestBody CookRequest request) {
//    Cook createdCook = cookService.createCook(request);
//    if (createdCook != null) {
//      return new ResponseEntity<>(createdCook, HttpStatus.CREATED);
//    } else {
//      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//  }
//
//  @PutMapping("/{id}")
//  public ResponseEntity<Cook> updateCook(@PathVariable Long id, @RequestBody CookRequest request) {
//    Cook updatedCook = cookService.updateCook(id, request);
//    if (updatedCook != null) {
//      return new ResponseEntity<>(updatedCook, HttpStatus.OK);
//    } else {
//      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//  }
//
//  @DeleteMapping("/{id}")
//  public ResponseEntity<Void> deleteWaiter(@PathVariable Long id) {
//    if (cookService.deleteCook(id)) {
//      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    } else {
//      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//  }
//}
