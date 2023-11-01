package com.java.gastrotalentapp.enums;

public enum ComprehensiveSchoolType {
  HIGH_SCHOOL("High school"),                 // LICEUM
  TECHNICAL_SCHOOL("Technical School"),       // TECHNIKUM
  VOCATIONAL_SCHOOL("Vocational school");     // SZKOŁA ZAWODOWA

  private final String displayName;

  ComprehensiveSchoolType(String displayName) {
    this.displayName = displayName;
  }

  public String getName() {
    return displayName;
  }
}
