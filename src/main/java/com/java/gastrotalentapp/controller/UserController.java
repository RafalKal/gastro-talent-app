package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import com.java.gastrotalentapp.repository.UserRepository;
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
}
