package com.java.gastrotalentapp.model;

import javax.persistence.Embeddable;
import java.time.LocalDate;

@Embeddable
public class ProfessionalExperience {

    private String company;
    private String position;
    private String jobDescription;
    private LocalDate startDate;
    private LocalDate endDate;

}

