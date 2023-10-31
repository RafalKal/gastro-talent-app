package com.java.gastrotalentapp.model;

import java.time.LocalDate;
import javax.persistence.Embeddable;

@Embeddable
public class Education {
  private String degree;
  private String university;
  private LocalDate graduationDate;
}
