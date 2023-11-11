package com.java.gastrotalentapp.validation;

import static com.java.gastrotalentapp.enums.Role.POTENTIAL_EMPLOYEE;
import static com.java.gastrotalentapp.enums.Role.POTENTIAL_EMPLOYER;

import com.java.gastrotalentapp.requests_responses.requests.RegisterRequest;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RegisterCheckValidator implements ConstraintValidator<RegisterCheck, RegisterRequest> {
  @Override
  public void initialize(RegisterCheck constraintAnnotation) {}

  @Override
  public boolean isValid(RegisterRequest registerRequest, ConstraintValidatorContext context) {
    boolean isValid = true;
    Map<String, String> validationErrors = new HashMap<>();

    if (registerRequest.getRole() == POTENTIAL_EMPLOYEE) {
      if (registerRequest.getFirstname() == null || registerRequest.getFirstname().isBlank()) {
        validationErrors.put("firstname", "First name cannot be blank");
        isValid = false;
      }
      if (registerRequest.getLastname() == null || registerRequest.getLastname().isBlank()) {
        validationErrors.put("lastname", "Last name cannot be blank");
        isValid = false;
      }
      if (registerRequest.getDateOfBirth() == null) {
        validationErrors.put("dateOfBirth", "Date of birth cannot be null");
        isValid = false;
      } else if (registerRequest.getDateOfBirth().isAfter(LocalDate.now())) {
        validationErrors.put("dateOfBirth", "Date of birth must be in the past");
        isValid = false;
      }
    } else if (registerRequest.getRole() == POTENTIAL_EMPLOYER) {
      if (registerRequest.getCompanyName() == null || registerRequest.getCompanyName().isBlank()) {
        validationErrors.put("companyName", "Company name cannot be blank");
        isValid = false;
      }
      if (registerRequest.getREGON() == null || registerRequest.getREGON().isBlank()) {
        validationErrors.put("REGON", "REGON cannot be blank");
        isValid = false;
      }
      if (registerRequest.getNIP() == null || registerRequest.getNIP().isBlank()) {
        validationErrors.put("NIP", "NIP name cannot be blank");
        isValid = false;
      }
      if (registerRequest.getDateEstablishmentCompany() == null) {
        validationErrors.put(
            "dateEstablishmentCompany", "Date of establishment of company cannot be null");
        isValid = false;
      } else if (registerRequest.getDateEstablishmentCompany().isAfter(LocalDate.now())) {
        validationErrors.put(
            "dateEstablishmentCompany", "Date of establishment of company must be in the past");
        isValid = false;
      }
    }

    if (!isValid) {
      context.disableDefaultConstraintViolation();
      for (Map.Entry<String, String> entry : validationErrors.entrySet()) {
        context
            .buildConstraintViolationWithTemplate(entry.getValue())
            .addPropertyNode(entry.getKey())
            .addConstraintViolation();
      }
    }

    return isValid;
  }
}
