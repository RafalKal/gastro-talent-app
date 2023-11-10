package com.java.gastrotalentapp.enums;

public enum Role {
  VISITOR,                    // ODWIEDZAJĄCY STRONĄ INTERNETOWĄ (NIEZALOGOWANY)
  POTENTIAL_EMPLOYEE,         // POTENCJALNY PRACOWNIK / SZUKAJĄCY PRACY
  POTENTIAL_EMPLOYER,         // POTENCJALNY PRACODAWCA / SZUKAJĄCY PRACOWNIKA
  ADMIN;                      // ADMIN

  public String getDescription() {
    switch (this) {
      case VISITOR:
        return "Odwiedzający stronę internetową (niezalogowany)";
      case POTENTIAL_EMPLOYEE:
        return "Potencjalny pracownik / Szukający pracy";
      case POTENTIAL_EMPLOYER:
        return "Potencjalny pracodawca / Szukający pracownika";
      case ADMIN:
        return "Administrator";
      default:
        return "Nieznana rola";
    }
  }

  public boolean isTypeEnablesRegistration() {
    return this == POTENTIAL_EMPLOYEE || this == POTENTIAL_EMPLOYER;
  }

  public boolean isEmployeeType() {
    return this == POTENTIAL_EMPLOYEE;
  }

  public boolean isEmployerType() {
    return this == POTENTIAL_EMPLOYER;
  }

  public boolean isVisitorType() {
    return this == POTENTIAL_EMPLOYER;
  }

  public boolean isAdminType() {
    return this == POTENTIAL_EMPLOYER;
  }
}
