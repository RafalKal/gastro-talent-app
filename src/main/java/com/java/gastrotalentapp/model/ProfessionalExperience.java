package com.java.gastrotalentapp.model;

import java.time.LocalDate;
import javax.persistence.Embeddable;
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
}
