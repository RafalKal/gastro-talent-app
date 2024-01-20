package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.exception.InvalidRoleException;
import com.java.gastrotalentapp.model.Address;
import com.java.gastrotalentapp.model.entity.Admin;
import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.model.entity.Employer;
import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import com.java.gastrotalentapp.repository.AdminRepository;
import com.java.gastrotalentapp.repository.EmployeeRepository;
import com.java.gastrotalentapp.repository.EmployerRepository;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.repository.criteria.UserCriteriaRepository;
import com.java.gastrotalentapp.requests_responses.requests.UserPasswordRequest;
import com.java.gastrotalentapp.requests_responses.requests.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserCriteriaRepository userCriteriaRepository;
  private final EmployeeRepository employeeRepository;
  private final EmployerRepository employerRepository;
  private final AdminRepository adminRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  public Page<User> getUsers(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return userCriteriaRepository.findAllWithFilters(userPage, userSearchCriteria);
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public User updateUser(User user, UserUpdateRequest request) {
    User updatedUser;
    switch (user.getRole()) {
      case POTENTIAL_EMPLOYER:
        Employer employer = employerRepository.getById(user.getId());
        employer.setCompanyName(request.getCompanyName());
        employer.setNIP(request.getNIP());
        employer.setREGON(request.getREGON());
        employer.setDateEstablishmentCompany(request.getDateEstablishmentCompany());

        updatedUser = employer;
        break;
      case POTENTIAL_EMPLOYEE:
        Employee employee = employeeRepository.getById(user.getId());
        employee.setFirstname(request.getFirstname());
        employee.setLastname(request.getLastname());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setPhoneNumber(request.getPhoneNumber());

        Address address =
            Address.builder()
                .city(request.getAddress().getCity())
                .street(request.getAddress().getStreet())
                .postalCode(request.getAddress().getPostalCode())
                .houseNumber(request.getAddress().getHouseNumber())
                .build();

        employee.setAddress(address);

        updatedUser = employee;
        break;
      case ADMIN:
        Admin admin = adminRepository.getById(user.getId());
        admin.setFirstname(request.getFirstname());
        admin.setLastname(request.getLastname());
        admin.setDateOfBirth(request.getDateOfBirth());

        updatedUser = admin;
        break;
      default:
        throw new InvalidRoleException("Provided role is not supported.");
    }
    return userRepository.save(updatedUser);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public void updatePassword(UserPasswordRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getOldPassword()));
    var user =
        userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);
  }
}
