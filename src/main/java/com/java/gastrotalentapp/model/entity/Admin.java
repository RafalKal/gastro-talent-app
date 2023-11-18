package com.java.gastrotalentapp.model.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
@SuperBuilder(toBuilder = true)
@Entity
public class Admin extends User {

  @NotBlank
  private String firstname;

  @NotBlank 
  private String lastname;

  @NotNull
  private LocalDate dateOfBirth;

}
