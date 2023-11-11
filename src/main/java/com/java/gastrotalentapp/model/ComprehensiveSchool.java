package com.java.gastrotalentapp.model;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.java.gastrotalentapp.enums.ComprehensiveSchoolType;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ComprehensiveSchool {

  @Enumerated(EnumType.STRING)
  private ComprehensiveSchoolType comprehensiveSchoolType;

  private String comprehensiveSchoolName;

  private String comprehensiveSchoolCity;
}
