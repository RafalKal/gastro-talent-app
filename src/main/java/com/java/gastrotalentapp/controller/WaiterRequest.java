package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.Education;
import com.java.gastrotalentapp.model.ProfessionalExperience;
import lombok.Getter;

@Getter
public class WaiterRequest {
    private Education education;
    private ProfessionalExperience professionalExperience;
    private String otherSpeciality;
}
