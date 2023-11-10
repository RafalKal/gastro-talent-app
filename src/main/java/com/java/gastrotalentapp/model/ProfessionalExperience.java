package com.java.gastrotalentapp.model;

import com.java.gastrotalentapp.enums.Profession;
import java.time.LocalDate;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ProfessionalExperience {

  private String company;

  private String position;

  private String jobDescription;

  private LocalDate startDate;

  private LocalDate endDate;

  @Enumerated(EnumType.STRING)
  private Profession profession;
}
