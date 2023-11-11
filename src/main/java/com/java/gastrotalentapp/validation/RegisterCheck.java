package com.java.gastrotalentapp.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RegisterCheckValidator.class)
public @interface RegisterCheck {
  String message() default "Register validation failed";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
