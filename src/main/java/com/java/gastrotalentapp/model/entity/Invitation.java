package com.java.gastrotalentapp.model.entity;

import com.java.gastrotalentapp.enums.InvitationStatus;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Invitation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "employer_id", nullable = false)
  private Employer employer;

  @ManyToOne
  @JoinColumn(name = "employee_id", nullable = false)
  private Cook cook;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private InvitationStatus status;

  @Column(name = "interview_date")
  private LocalDateTime interviewDate;

  @Column(name = "created_at", nullable = false, updatable = false)
  @CreatedDate
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  @LastModifiedDate
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}
