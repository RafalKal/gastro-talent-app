package com.java.gastrotalentapp.model;

import javax.persistence.*;
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
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(name = "profession")
public abstract class Employee {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected Long id;

  @Embedded 
  private Education education;

  @Embedded
  private ProfessionalExperience professionalExperience;

  public String getProfession() {
    String[] classNameParts = getClass().getCanonicalName().split("\\.");
    return classNameParts[classNameParts.length - 1];
  }
}
