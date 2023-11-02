package com.java.gastrotalentapp.model.entity.criteria;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaiterSearchCriteria {

  private String firstname;

  private Boolean hasWineKnowledge;

  private Boolean canHandleLargeParties;

  private Boolean isCertifiedSommelier;

  private String preferredServingStyle;

  private Boolean isTrainedInMixology;
}
