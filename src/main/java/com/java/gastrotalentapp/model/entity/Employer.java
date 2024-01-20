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
public class Employer extends User {

  @NotBlank
  private String companyName;

  @NotBlank
  private String NIP;

  @NotBlank
  private String REGON;

  @NotNull
  private LocalDate dateEstablishmentCompany;

//    @OneToMany(
//        mappedBy = "employer",
//        cascade = CascadeType.ALL,
//        orphanRemoval = true,
//        fetch = FetchType.LAZY)
//    private Set<JobPosting> jobPostings;
}
