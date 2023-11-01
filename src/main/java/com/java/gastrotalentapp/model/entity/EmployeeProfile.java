package com.java.gastrotalentapp.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java.gastrotalentapp.model.Education;
import com.java.gastrotalentapp.model.ProfessionalExperience;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
public abstract class EmployeeProfile {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected Long id;

  @Embedded
  private Education education;

  @Embedded
  private ProfessionalExperience professionalExperience;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

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
