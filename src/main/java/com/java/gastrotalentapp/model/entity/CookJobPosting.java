//package com.java.gastrotalentapp.model.entity;
//
//import com.java.gastrotalentapp.enums.CookingStyle;
//import java.util.Set;
//import javax.persistence.*;
//import lombok.*;
//import lombok.experimental.SuperBuilder;
//
//@Getter
//@Setter
//@ToString(callSuper = true)
//@EqualsAndHashCode(callSuper = true)
//@AllArgsConstructor
//@RequiredArgsConstructor
//@SuperBuilder(toBuilder = true)
//@Entity
//public class CookJobPosting extends JobPosting {
//
//  @ElementCollection(fetch = FetchType.LAZY)
//  @CollectionTable(
//          name = "cook_job_posting_cooking_styles",
//          joinColumns = @JoinColumn(name = "cook_job_posting_id"))
//  @Enumerated(EnumType.STRING)
//  @Column(name = "cooking_style")
//  private Set<CookingStyle> requiredCookingStyles;
//
//  @Column(nullable = false)
//  private Integer requiredYearsOfExperience;
//
//  private Boolean requiresCertifiedSousChef;
//}
