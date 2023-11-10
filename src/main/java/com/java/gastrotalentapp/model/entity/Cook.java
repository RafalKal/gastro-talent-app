package com.java.gastrotalentapp.model.entity;

import com.java.gastrotalentapp.enums.CookingStyle;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Size;

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
public class Cook extends EmployeeProfile {

  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(name = "cook_cooking_styles", joinColumns = @JoinColumn(name = "cook_id"))
  @Enumerated(EnumType.STRING)
  @Column(name = "cooking_style")
  private Set<CookingStyle> cookingStyles; // Zbiór stylów gotowania

  private Integer yearsOfExperience; // Lata doświadczenia w zawodzie

  private Boolean isCertifiedSousChef; // Czy jest certyfikowanym szefem kuchni

  @ElementCollection(fetch = FetchType.LAZY)
  @CollectionTable(name = "cook_signature_dishes", joinColumns = @JoinColumn(name = "cook_id"))
  @Column(name = "signature_dish")
  @Size(min = 1, max = 3)
  private Set<String>
      signatureDishes; // Zbiór sygnaturowych (popisowych) dań kucharza ograniczony do 3 pozycji

  private Boolean canHandlePressure; // Czy potrafi pracować pod presją
}
