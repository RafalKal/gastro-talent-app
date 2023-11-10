package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.config.JwtService;
import com.java.gastrotalentapp.exception.EmailExistsException;
import com.java.gastrotalentapp.exception.InvalidRoleException;
import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.AuthenticationRequest;
import com.java.gastrotalentapp.requests_responses.requests.RegisterRequest;
import com.java.gastrotalentapp.requests_responses.responses.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @Transactional
  public AuthenticationResponse register(RegisterRequest request) {

    if (!request.getRole().isTypeEnablesRegistration()) {
      throw new InvalidRoleException("Account could not be created with the specified role.");
    }

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new EmailExistsException("Email already exists: " + request.getEmail());
    }

    var user =
        User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .dateOfBirth(request.getDateOfBirth())
            .role(request.getRole())
            .build();
    userRepository.save(user);

    return authenticationResponse(user);
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var user =
        userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return authenticationResponse(user);
  }

  private AuthenticationResponse authenticationResponse(User user) {
    String jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .role(user.getRole())
        .id(user.getId())
        .build();
  }
}
