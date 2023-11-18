package com.java.gastrotalentapp.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java.gastrotalentapp.model.Education;
import com.java.gastrotalentapp.model.ProfessionalExperience;
import java.time.LocalDateTime;
import java.util.Set;
import javax.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Data
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@SuperBuilder(toBuilder = true)
@Entity
public abstract class EmployeeProfile {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "employee_id")
  private Employee employee;

  @Embedded private Education education;

  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(
      name = "employee_professional_experiences",
      joinColumns = @JoinColumn(name = "employee_id"))
  private Set<ProfessionalExperience> professionalExperiences;

  @JsonIgnore
  @ManyToMany(mappedBy = "applicants", fetch = FetchType.LAZY)
  private Set<JobPosting> jobApplications;

  @Column(name = "created_at", nullable = false, updatable = false)
  @CreatedDate
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  @LastModifiedDate
  private LocalDateTime updatedAt;

  public String getProfession() {
    String[] classNameParts = getClass().getCanonicalName().split("\\.");
    return classNameParts[classNameParts.length - 1];
  }

  @PrePersist
  protected void onCreate() {
    createdAt = updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}
