package com.java.gastrotalentapp.model;

import com.java.gastrotalentapp.enums.EducationLevel;
import java.time.LocalDate;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Education {

  @Enumerated(EnumType.STRING)
  private EducationLevel educationLevel;

  @Embedded
  private ComprehensiveSchool comprehensiveSchool;

  @Embedded
  private University university;

  private LocalDate educationGraduationDate;
}
