//package com.java.gastrotalentapp.builders;
//
//import com.java.gastrotalentapp.model.entity.Cook;
//import com.java.gastrotalentapp.model.entity.Employee;
//import com.java.gastrotalentapp.model.entity.Employer;
//import com.java.gastrotalentapp.repository.UserRepository;
//import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
//import com.java.gastrotalentapp.requests_responses.requests.RegisterRequest;
//import javax.persistence.EntityNotFoundException;
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
//  public static Employee builEmployeeUsingRequest(RegisterRequest request) {
//    return Employee.builder()
//        .firstname(request.getFirstname())
//        .lastname(request.getLastname())
//        .email(request.getEmail())
//        .password(passwordEncoder.encode(request.getPassword()))
//        .dateOfBirth(request.getDateOfBirth())
//        .role(request.getRole())
//        .build();
//  }
//
//  public static Employer builEmployerUsingRequest(RegisterRequest request) {
//    return Employer.builder()
//        .email(request.getEmail())
//        .password(passwordEncoder.encode(request.getPassword()))
//        .dateEstablishmentCompany(request.getDateEstablishmentCompany())
//        .role(request.getRole())
//        .build();
//  }
//
//  // builder method for updating existing object.
//  public static Cook buildUsingRequest(
//      Long cookId, CookRequest request, Long userId, UserRepository userRepository) {
//    return Cook.builder()
//        .id(cookId)
//        .education(request.getEducation())
//        .professionalExperience(request.getProfessionalExperience())
//        .user(
//            userRepository
//                .findById(userId)
//                .orElseThrow(
//                    () ->
//                        new EntityNotFoundException(
//                            "User not found with id: " + request.getUserId())))
//        .cookingStyles(request.getCookingStyles())
//        .canHandlePressure(request.getCanHandlePressure())
//        .isCertifiedSousChef(request.getIsCertifiedSousChef())
//        .signatureDishes(request.getSignatureDishes())
//        .yearsOfExperience(request.getYearsOfExperience())
//        .build();
//  }
//}
