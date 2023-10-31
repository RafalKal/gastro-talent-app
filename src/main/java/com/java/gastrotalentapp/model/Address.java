package com.java.gastrotalentapp.model;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Address {

  @NotBlank
  private String street;

  @NotNull
  private Integer houseNumber;

  @NotBlank
  private String city;

  @NotBlank
  private String postalCode;

  @Override
  public String toString() {
    return street + " " + houseNumber + ", " + postalCode + " " + city;
  }
}
