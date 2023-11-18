package com.java.gastrotalentapp.requests_responses.requests;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class UserPasswordRequest {

  @Email(message = "Invalid email address")
  @Pattern(
      regexp = "^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",
      message = "Invalid domain name")
  private String email;

  private String oldPassword;

  @NotBlank(message = "Password cannot be blank")
  @Pattern(
      regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
      message =
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit")
  private String newPassword;
}
