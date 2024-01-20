package com.java.gastrotalentapp.requests_responses.requests;

import java.time.LocalDate;

import com.java.gastrotalentapp.model.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embedded;
import javax.validation.constraints.Pattern;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {

  @Embedded
  private Address address;

  private String firstname;

  private String lastname;

  private LocalDate dateOfBirth;

  private String companyName;

  private String REGON;

  private String NIP;

  @Pattern(regexp = "[1-9]\\d{8}")
  private String phoneNumber;

  private LocalDate dateEstablishmentCompany;
}
