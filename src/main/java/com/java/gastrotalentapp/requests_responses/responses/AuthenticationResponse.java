package com.java.gastrotalentapp.requests_responses.responses;

import com.java.gastrotalentapp.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

  private Long id;
  private Role role;
  private String token;
}
