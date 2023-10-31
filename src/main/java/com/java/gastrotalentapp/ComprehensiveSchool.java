package com.java.gastrotalentapp;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class ComprehensiveSchool {
  @Enumerated(EnumType.STRING)
  private ComprehensiveSchoolType comprehensiveSchoolType;
  private String schoolName;
  private String city;
}
