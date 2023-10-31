package com.java.gastrotalentapp.model;

import javax.persistence.Entity;
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
public class Cook extends Employee {
  private String speciality;

  public String getSpeciality() {
    return speciality;
  }

  public void setSpeciality(String speciality) {
    this.speciality = speciality;
  }
}
