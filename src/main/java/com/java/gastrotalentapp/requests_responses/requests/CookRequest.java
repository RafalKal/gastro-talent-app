package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.enums.CookingStyle;
import com.java.gastrotalentapp.model.Education;
import com.java.gastrotalentapp.model.ProfessionalExperience;
import java.util.Set;
import lombok.Getter;

@Getter
public class CookRequest {

  private Education education;

  private Set<ProfessionalExperience> professionalExperiences;

  private Long userId;

  private Set<CookingStyle> cookingStyles;

  private Integer yearsOfExperience;

  private Boolean isCertifiedSousChef;

  private Set<String> signatureDishes;

  private Boolean canHandlePressure;
}
