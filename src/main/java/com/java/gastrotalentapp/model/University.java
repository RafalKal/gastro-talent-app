package com.java.gastrotalentapp.model;

import javax.persistence.Embeddable;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class University {

  private String universityName;

  private String universityCity;
}
