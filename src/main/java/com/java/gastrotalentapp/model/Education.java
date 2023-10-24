package com.java.gastrotalentapp.model;

import javax.persistence.Embeddable;
import java.time.LocalDate;

@Embeddable
public class Education {
    private String degree;
    private String university;
    private LocalDate graduationDate;

}

