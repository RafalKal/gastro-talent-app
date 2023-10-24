package com.java.gastrotalentapp.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

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

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private LocalDate dateOfBirth;

    @NotBlank
    private String address;

    @Pattern(regexp = "[1-9]\\d{8}")
    private String phoneNumber;

    @Embedded
    private Education education;

    @Embedded
    private ProfessionalExperience professionalExperience;

    public String getProfession() {
        String[] classNameParts = getClass().getCanonicalName().split("\\.");
        return classNameParts[classNameParts.length - 1];
    }

}
