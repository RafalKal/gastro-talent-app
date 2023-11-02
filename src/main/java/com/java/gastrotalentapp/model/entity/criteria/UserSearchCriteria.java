package com.java.gastrotalentapp.model.entity.criteria;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchCriteria {

  private String firstname;

  private String lastname;

  private String email;

  private String phoneNumber;

  private LocalDate dateOfBirth;

  private LocalDate dateOfBirthGreater;

  private LocalDate dateOfBirthLess;

  private LocalDateTime createdAt;

  private LocalDateTime dateOfCreationGreater;

  private LocalDateTime dateOfCreationLess;

  private LocalDateTime updatedAt;

  private LocalDateTime dateOfUpdateGreater;

  private LocalDateTime dateOfUpdateLess;
}
