package com.java.gastrotalentapp.model.entity;

import javax.persistence.Entity;
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
public class Waiter extends EmployeeProfile {

  private Boolean hasWineKnowledge;           // Czy posiada wiedzę o winach

  private Boolean canHandleLargeParties;      // Czy potrafi obsłużyć duże grupy gości

  private Boolean isCertifiedSommelier;       // Czy jest certyfikowanym sommelierem

  private String preferredServingStyle;       // Ulubiony styl obsługi kelnerskiej

  private Boolean isTrainedInMixology;        // Czy jest przeszkolony w mixologii (miksowanie drinków)
}
