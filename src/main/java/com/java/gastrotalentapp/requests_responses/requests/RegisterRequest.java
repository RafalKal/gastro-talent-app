package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.enums.Role;
import java.time.LocalDate;

import com.java.gastrotalentapp.validation.UniqueEmail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  @NotBlank(message = "First name cannot be blank")
  private String firstname;

  @NotBlank(message = "Last name cannot be blank")
  private String lastname;

  @Email(message = "Invalid email address")
  @Pattern(
      regexp = "^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",
      message = "Invalid email address")
  @UniqueEmail(message = "Email already exists")
  private String email;

  @NotBlank(message = "Password cannot be blank")
  @Pattern(
      regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
      message =
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit")
  private String password;

  @NotNull(message = "Date of birth cannot be null")
  @Past(message = "Date of birth must be in the past")
  private LocalDate dateOfBirth;

  @NotNull(message = "Role cannot be null")
  @Enumerated(EnumType.STRING)
  private Role role;
}
