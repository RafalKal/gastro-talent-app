package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.model.Education;
import com.java.gastrotalentapp.model.ProfessionalExperience;
import lombok.Getter;

@Getter
public class WaiterRequest {

  private Education education;

  private ProfessionalExperience professionalExperience;

  private Long userId;

  private Boolean hasWineKnowledge;

  private Boolean canHandleLargeParties;

  private Boolean isCertifiedSommelier;

  //TODO enuma dorobić
  private String preferredServingStyle;

  private Boolean isTrainedInMixology;
}
