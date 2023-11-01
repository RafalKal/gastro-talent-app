package com.java.gastrotalentapp.enums;

public enum EducationLevel {
  ELEMENTARY("Elementary"),         // WYKSZTAŁCENIE PODSTAWOWE
  SECONDARY("Secondary"),           // WYKSZTAŁCENIE ŚREDNIE
  VOCATIONAL("Vocational"),         // WYKSZTAŁCENIE ZAWODOWE
  HIGHER("Higher"),                 // WYKSZTAŁCENIE WYŻSZE
  MASTER("Master"),                 // MAGISTER
  DOCTORATE("Doctorate");           // DOKTORAT

  private final String displayName;

  EducationLevel(String displayName) {
    this.displayName = displayName;
  }

  public String getName() {
    return displayName;
  }
}
