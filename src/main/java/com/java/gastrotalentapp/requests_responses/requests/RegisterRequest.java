package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.enums.Role;
import com.java.gastrotalentapp.validation.RegisterCheck;
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
@RegisterCheck
public class RegisterRequest {

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

  @Enumerated(EnumType.STRING)
  @ValidRole
  private Role role;

  private String firstname;

  private String lastname;

  private LocalDate dateOfBirth;

  private String companyName;

  private String REGON;

  private String NIP;

  private LocalDate dateEstablishmentCompany;
}
