package com.java.gastrotalentapp.builders;

import com.java.gastrotalentapp.enums.Profession;
import com.java.gastrotalentapp.model.entity.Cook;
import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.repository.EmployeeRepository;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@RequiredArgsConstructor
public class CookBuilder {



  // builder method for creating new object.
  public static Cook buildUsingRequest(CookRequest request, UserRepository userRepository, EmployeeRepository employeeRepository) {

    return Cook.builder()
        .education(request.getEducation())
        .professionalExperiences(request.getProfessionalExperiences())
        //        .user(
        //            userRepository
        //                .findById(request.getUserId())
        //                .orElseThrow(
        //                    () ->
        //                        new EntityNotFoundException(
        //                            "User not found with id: " + request.getUserId())))
        //        .employee(employeeRepository.findById())
        //        .employee(
        //                (Employee) userRepository
        //                    .findById(request.getUserId())
        //                    .orElseThrow(
        //                        () ->
        //                            new EntityNotFoundException(
        //                                "User not found with id: " + request.getUserId())))
        .employee(null)
        .empId(request.getUserId())
        .cookingStyles(request.getCookingStyles())
        .canHandlePressure(request.getCanHandlePressure())
        .isCertifiedSousChef(request.getIsCertifiedSousChef())
        .signatureDishes(request.getSignatureDishes())
        .yearsOfExperience(request.getYearsOfExperience())
        .profession(Profession.COOK)
        .build();
  }

  // builder method for updating existing object.
  public static Cook buildUsingRequest(
      Long cookId, CookRequest request, Long userId, UserRepository userRepository) {
    return Cook.builder()
        .id(cookId)
        .education(request.getEducation())
        .professionalExperiences(request.getProfessionalExperiences())
        //        .user(
        //            userRepository
        //                .findById(userId)
        //                .orElseThrow(
        //                    () ->
        //                        new EntityNotFoundException(
        //                            "User not found with id: " + request.getUserId())))
        .employee(null)
            .empId(request.getUserId())
        .cookingStyles(request.getCookingStyles())
        .canHandlePressure(request.getCanHandlePressure())
        .isCertifiedSousChef(request.getIsCertifiedSousChef())
        .signatureDishes(request.getSignatureDishes())
        .yearsOfExperience(request.getYearsOfExperience())
        .build();
  }
}
