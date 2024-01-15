package com.java.gastrotalentapp.model.entity;

import java.time.LocalDate;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
@SuperBuilder(toBuilder = true)
@Entity
public class Employee extends User {

  @NotNull
  private LocalDate dateOfBirth;

  @NotBlank
  private String firstname;

  @NotBlank 
  private String lastname;

  @OneToMany(
      mappedBy = "employee",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.LAZY)
  private Set<EmployeeProfile> profiles;



}
