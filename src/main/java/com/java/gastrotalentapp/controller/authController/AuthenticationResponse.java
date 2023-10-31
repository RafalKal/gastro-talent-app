package com.java.gastrotalentapp.controller.authController;

import com.java.gastrotalentapp.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
  private Role role;
  private String token;
}
