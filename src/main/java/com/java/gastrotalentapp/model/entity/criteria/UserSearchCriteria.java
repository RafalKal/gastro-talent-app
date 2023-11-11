package com.java.gastrotalentapp.model.entity.criteria;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchCriteria { //TODO trzeba pomyśleć jak to pozmieniać bo aby to działało to muszą zostać pola unikatowe z klasy user albo zrobić tak że usera będziemy traktować bardziej jako Employee bo on ma dane tj user
                                  //TODO a Employer to strikte firme wiec do wyszukiwania tego innny route


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
