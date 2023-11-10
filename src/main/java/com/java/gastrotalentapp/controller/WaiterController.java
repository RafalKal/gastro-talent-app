//package com.java.gastrotalentapp.controller;
//
//import com.java.gastrotalentapp.model.entity.Waiter;
//import com.java.gastrotalentapp.model.entity.criteria.WaiterSearchCriteria;
//import com.java.gastrotalentapp.model.entity.page.WaiterPage;
//import com.java.gastrotalentapp.requests_responses.requests.WaiterRequest;
//import com.java.gastrotalentapp.service.WaiterService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/v1/waiters")
//public class WaiterController {
//
//  private final WaiterService waiterService;
//
//  @GetMapping
//  public ResponseEntity<Page<Waiter>> getWaiters(
//      WaiterPage waiterPage, WaiterSearchCriteria waiterSearchCriteria) {
//    return new ResponseEntity<>(
//        waiterService.getWaiters(waiterPage, waiterSearchCriteria), HttpStatus.OK);
//  }
//
//  @GetMapping("/{id}")
//  public ResponseEntity<Waiter> getWaiterById(@PathVariable Long id) {
//    return waiterService
//        .getWaiterById(id)
//        .map(waiter -> new ResponseEntity<>(waiter, HttpStatus.OK))
//        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//  }
//
//  @PostMapping
//  public ResponseEntity<Waiter> createWaiter(@RequestBody WaiterRequest request) {
//    Waiter createdWaiter = waiterService.createWaiter(request);
//    if (createdWaiter != null) {
//      return new ResponseEntity<>(createdWaiter, HttpStatus.CREATED);
//    } else {
//      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//  }
//
//  @PutMapping("/{id}")
//  public ResponseEntity<Waiter> updateWaiter(
//      @PathVariable Long id, @RequestBody WaiterRequest request) {
//    Waiter updatedWaiter = waiterService.updateWaiter(id, request);
//    if (updatedWaiter != null) {
//      return new ResponseEntity<>(updatedWaiter, HttpStatus.OK);
//    } else {
//      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }
//  }
//
//  @DeleteMapping("/{id}")
//  public ResponseEntity<Void> deleteWaiter(@PathVariable Long id) {
//    if (waiterService.deleteWaiter(id)) {
//      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    } else {
//      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//  }
//}
