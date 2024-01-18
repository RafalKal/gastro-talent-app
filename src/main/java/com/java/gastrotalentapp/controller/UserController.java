package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import com.java.gastrotalentapp.requests_responses.requests.UserPasswordRequest;
import com.java.gastrotalentapp.requests_responses.requests.UserUpdateRequest;
import com.java.gastrotalentapp.service.UserService;
import javax.validation.Valid;

import io.swagger.annotations.*;
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
@Api(tags = "User Controller", description = "Operations related to user management")
public class UserController {

    private final UserService userService;

    @GetMapping
    @ApiOperation(value = "Get Users", notes = "Retrieve a paginated list of users based on search criteria")
    public ResponseEntity<Page<User>> getUsers(
            @ApiParam(value = "Page information", required = true) UserPage userPage,
            @ApiParam(value = "Search criteria", required = true) UserSearchCriteria userSearchCriteria) {
        return new ResponseEntity<>(userService.getUsers(userPage, userSearchCriteria), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Get User by ID", notes = "Retrieve information about a user by their ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User found"),
            @ApiResponse(code = 404, message = "User not found")
    })
    public ResponseEntity<User> getUserById(
            @ApiParam(value = "ID of the user", required = true) @PathVariable Long id) {
        return userService
                .getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "Update User", notes = "Update information about a user by their ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User updated"),
            @ApiResponse(code = 400, message = "Bad Request - Invalid input data"),
            @ApiResponse(code = 404, message = "User not found")
    })
    public ResponseEntity<User> updateUser(
            @ApiParam(value = "ID of the user", required = true) @PathVariable Long id,
            @ApiParam(value = "Updated user details", required = true) @Valid @RequestBody UserUpdateRequest updateRequest) {
        return userService
                .getUserById(id)
                .map(
                        existingUser -> {
                            User updatedUser = userService.updateUser(existingUser, updateRequest);
                            return ResponseEntity.ok(updatedUser);
                        })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    @ApiOperation(value = "Update Password", notes = "Update the password of the currently authenticated user")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Password updated"),
            @ApiResponse(code = 400, message = "Bad Request - Invalid input data")
    })
    public ResponseEntity<?> updatePassword(
            @ApiParam(value = "User password details", required = true) @Valid @RequestBody UserPasswordRequest userPasswordRequest) {
        userService.updatePassword(userPasswordRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete User", notes = "Delete a user by their ID")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "User deleted"),
            @ApiResponse(code = 404, message = "User not found")
    })
    public ResponseEntity<?> deleteUser(
            @ApiParam(value = "ID of the user", required = true) @PathVariable Long id) {
        return userService
                .getUserById(id)
                .map(
                        existingUser -> {
                            userService.deleteUser(id);
                            return ResponseEntity.ok().build();
                        })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
