package com.java.gastrotalentapp.validation;

import com.java.gastrotalentapp.enums.Role;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import static com.java.gastrotalentapp.enums.Role.POTENTIAL_EMPLOYEE;
import static com.java.gastrotalentapp.enums.Role.POTENTIAL_EMPLOYER;

public class ValidRoleValidator implements ConstraintValidator<ValidRole, Role> {

  @Override
  public void initialize(ValidRole constraintAnnotation) {}

  @Override
  public boolean isValid(Role role, ConstraintValidatorContext context) {
    return role.isTypeEnablesRegistration();
  }
}
