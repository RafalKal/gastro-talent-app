//package com.java.gastrotalentapp.builders;
//
//import com.java.gastrotalentapp.model.entity.Employee;
//import com.java.gastrotalentapp.model.entity.Employer;
//import com.java.gastrotalentapp.model.entity.User;
//import com.java.gastrotalentapp.repository.UserRepository;
//import com.java.gastrotalentapp.requests_responses.requests.RegisterRequest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//public class UserBuilder {
//
//  private static PasswordEncoder passwordEncoder;
//
//  public UserBuilder(PasswordEncoder passwordEncoder) {
//    this.passwordEncoder = passwordEncoder;
//  }
//
//  // builder method for creating new object.
//  public static User buildUsingRequest(RegisterRequest request, UserRepository userRepository) {
//    return Employer.builder()
//        .NIP(request.getNIP())
//        .REGON(request.getREGON())
//        .dateEstablishmentCompany(request.getDateEstablishmentCompany())
//        .companyName(request.getCompanyName())
//        .password(passwordEncoder.encode(request.getPassword()))
//        .email(request.getEmail())
//        .role(request.getRole())
//        .build();
//  }
//
//   // builder method for creating new object.
//    public static Employee builEmployeeUsingRequest(RegisterRequest request, UserRepository
//   userRepository) {
//      return Employee.builder()
//          .firstname(request.getFirstname())
//          .lastname(request.getLastname())
//          .email(request.getEmail())
//          .password(passwordEncoder.encode(request.getPassword()))
//          .dateOfBirth(request.getDateOfBirth())
//          .role(request.getRole())
//          .build();
//    }
//
//    public static Employer builEmployerUsingRequest(RegisterRequest request) {
//      return Employer.builder()
//          .email(request.getEmail())
//          .password(passwordEncoder.encode(request.getPassword()))
//          .dateEstablishmentCompany(request.getDateEstablishmentCompany())
//          .role(request.getRole())
//          .build();
//    }
//
//}
