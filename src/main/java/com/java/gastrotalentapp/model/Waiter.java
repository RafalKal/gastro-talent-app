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
public class Waiter extends Employee {
  private String otherSpeciality;

  public String getOtherSpeciality() {
    return otherSpeciality;
  }

  public void setOtherSpeciality(String speciality) {
    this.otherSpeciality = speciality;
  }
}
