package com.java.gastrotalentapp.enums;

public enum InvitationStatus {
  INVITED("Zaproszony"),
  INTERVIEW_CONDUCTED("Rozmowa odbyta"),
  REJECTED("Odrzucony"),
  ACCEPTED("Przyjęty"),
  CANCELLED("Odwołana");

  private final String description;

  InvitationStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
