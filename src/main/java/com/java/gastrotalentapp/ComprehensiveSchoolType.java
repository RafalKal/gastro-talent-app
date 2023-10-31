package com.java.gastrotalentapp;

public enum ComprehensiveSchoolType {
  HIGH_SCHOOL("High school"),
  TECHNICAL_SCHOOL("Technical School"),
  VOCATIONAL_SCHOOL("Vocational school");

  private final String displayName;

  ComprehensiveSchoolType(String displayName) {
    this.displayName = displayName;
  }

  public String getName() {
    return displayName;
  }
}
