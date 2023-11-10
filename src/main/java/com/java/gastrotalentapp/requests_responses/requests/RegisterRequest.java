package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.enums.Role;
import com.java.gastrotalentapp.validation.UniqueEmail;
import com.java.gastrotalentapp.validation.ValidRole;
import java.time.LocalDate;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
      message = "Invalid domain name")
  @UniqueEmail
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

  @Enumerated(EnumType.STRING)
  @ValidRole
  private Role role;

  @NotBlank(message = "Company name cannot be blank")
  private String companyName;

  @NotBlank(message = "REGON cannot be blank")
  private String REGON;

  @NotBlank(message = "NIP cannot be blank")
  private String NIP;

  @NotNull(message = "Date of establishment of company cannot be null")
  @Past(message = "Date of establishment of company be in the past")
  private LocalDate dateEstablishmentCompany;
}
