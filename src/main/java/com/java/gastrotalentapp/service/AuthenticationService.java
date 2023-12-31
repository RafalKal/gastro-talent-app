package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.config.JwtService;
import com.java.gastrotalentapp.exception.EmailExistsException;
import com.java.gastrotalentapp.exception.InvalidRoleException;
import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.model.entity.Employer;
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

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new EmailExistsException("Email already exists: " + request.getEmail());
    }

    User user;
    switch (request.getRole()) {
      case POTENTIAL_EMPLOYER:
        user =
            Employer.builder()
                .companyName(request.getCompanyName())
                .NIP(request.getNIP())
                .REGON(request.getREGON())
                .dateEstablishmentCompany(request.getDateEstablishmentCompany())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        break;
      case POTENTIAL_EMPLOYEE:
        user =
            Employee.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .role(request.getRole())
                .build();
        userRepository.save(user);
        break;
      default:
        throw new InvalidRoleException("Provided role is not supported for registration.");
    }
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
