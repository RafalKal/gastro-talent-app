package com.java.gastrotalentapp.requests_responses.requests;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {

  private String firstname;

  private String lastname;

  private LocalDate dateOfBirth;

  private String companyName;

  private String REGON;

  private String NIP;

  private LocalDate dateEstablishmentCompany;
}
