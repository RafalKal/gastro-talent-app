package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.exception.InvalidRoleException;
import com.java.gastrotalentapp.model.entity.Admin;
import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.model.entity.Employer;
import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import com.java.gastrotalentapp.repository.EmployeeRepository;
import com.java.gastrotalentapp.repository.EmployerRepository;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.repository.criteria.UserCriteriaRepository;
import com.java.gastrotalentapp.requests_responses.requests.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserCriteriaRepository userCriteriaRepository;
  private final EmployeeRepository employeeRepository;
  private final EmployerRepository employerRepository;

  public Page<User> getUsers(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return userCriteriaRepository.findAllWithFilters(userPage, userSearchCriteria);
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public User saveUser(User user, UserUpdateRequest request) {
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
        Employee employee= employeeRepository.getById(user.getId());
        employee.setFirstname(request.getFirstname());
        employee.setLastname(request.getLastname());
        employee.setDateOfBirth(request.getDateOfBirth());

        updatedUser = employee;
        break;
//      case ADMIN:
//        user =
//            Admin.builder()
//                .firstname(request.getFirstname())
//                .lastname(request.getLastname())
//                .dateOfBirth(request.getDateOfBirth())
//                .build();
//
//        break;
      default:
        throw new InvalidRoleException("Provided role is not supported.");
    }
    return userRepository.save(updatedUser);
  }

  public void deleteUser(Long id) { userRepository.deleteById(id);}
}
