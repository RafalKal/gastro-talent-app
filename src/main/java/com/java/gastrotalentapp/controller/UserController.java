package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.UserPasswordRequest;
import com.java.gastrotalentapp.requests_responses.requests.UserUpdateRequest;
import com.java.gastrotalentapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  private final UserService userService;
  private final UserRepository userRepository;

  @GetMapping
  public ResponseEntity<Page<User>> getUsers(
      UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return new ResponseEntity<>(userService.getUsers(userPage, userSearchCriteria), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return userService
        .getUserById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(
      @PathVariable Long id, @Valid @RequestBody UserUpdateRequest updateRequest) {
    return userService
        .getUserById(id)
        .map(
            existingUser -> {
              User updatedUser = userService.saveUser(existingUser, updateRequest);
              return ResponseEntity.ok(updatedUser);
            })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping
  public ResponseEntity<?> updatePassword(
      @Valid @RequestBody UserPasswordRequest userPasswordRequest) {
    userService.updatePassword(userPasswordRequest);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    return userService
        .getUserById(id)
        .map(
            existingEmployee -> {
              userService.deleteUser(id);
              return ResponseEntity.ok().build();
            })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}
