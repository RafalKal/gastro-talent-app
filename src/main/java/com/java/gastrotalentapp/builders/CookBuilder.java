package com.java.gastrotalentapp.builders;

import com.java.gastrotalentapp.model.entity.Cook;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CookBuilder {

  // builder method for creating new object.
  public static Cook buildUsingRequest(CookRequest request, UserRepository userRepository) {
    return Cook.builder()
        .education(request.getEducation())
        .professionalExperience(request.getProfessionalExperience())
        .user(
            userRepository
                .findById(request.getUserId())
                .orElseThrow(
                    () ->
                        new EntityNotFoundException(
                            "User not found with id: " + request.getUserId())))
        .cookingStyles(request.getCookingStyles())
        .canHandlePressure(request.getCanHandlePressure())
        .isCertifiedSousChef(request.getIsCertifiedSousChef())
        .signatureDishes(request.getSignatureDishes())
        .yearsOfExperience(request.getYearsOfExperience())
        .build();
  }

  // builder method for updating existing object.
  public static Cook buildUsingRequest(
      Long cookId, CookRequest request, Long userId, UserRepository userRepository) {
    return Cook.builder()
        .id(cookId)
        .education(request.getEducation())
        .professionalExperience(request.getProfessionalExperience())
        .user(
            userRepository
                .findById(userId)
                .orElseThrow(
                    () ->
                        new EntityNotFoundException(
                            "User not found with id: " + request.getUserId())))
        .cookingStyles(request.getCookingStyles())
        .canHandlePressure(request.getCanHandlePressure())
        .isCertifiedSousChef(request.getIsCertifiedSousChef())
        .signatureDishes(request.getSignatureDishes())
        .yearsOfExperience(request.getYearsOfExperience())
        .build();
  }
}
