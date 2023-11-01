package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.enums.Role;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;
  private String email;
  private String password;
  private LocalDate dateOfBirth;
  private Role role;
}
