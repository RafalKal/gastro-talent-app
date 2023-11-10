//package com.java.gastrotalentapp.model.entity;
//
//import java.time.LocalDateTime;
//import java.util.Set;
//import javax.persistence.*;
//import lombok.*;
//import lombok.experimental.SuperBuilder;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//
//@Getter
//@Setter
//@ToString
//@EqualsAndHashCode
//@AllArgsConstructor
//@RequiredArgsConstructor
//@SuperBuilder(toBuilder = true)
//@Entity
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
//public abstract class JobPosting {
//  @Id
//  @GeneratedValue(strategy = GenerationType.AUTO)
//  protected Long id;
//
//  @Column(nullable = false)
//  private String title;
//
//  @Column(nullable = false)
//  private String description;
//
//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "employer_id")
//  private Employer employer;
//
//  @ManyToMany(fetch = FetchType.LAZY)
//  @JoinTable(
//      name = "job_postings",
//      joinColumns = @JoinColumn(name = "job_posting_id"),
//      inverseJoinColumns = @JoinColumn(name = "employee_profile_id"))
//  private Set<EmployeeProfile> applicants;
//
//  @Column(name = "created_at", nullable = false, updatable = false)
//  @CreatedDate
//  private LocalDateTime createdAt;
//
//  @Column(name = "updated_at", nullable = false)
//  @LastModifiedDate
//  private LocalDateTime updatedAt;
//
//  @PrePersist
//  protected void onCreate() {
//    createdAt = updatedAt = LocalDateTime.now();
//  }
//
//  @PreUpdate
//  protected void onUpdate() {
//    updatedAt = LocalDateTime.now();
//  }
//}
