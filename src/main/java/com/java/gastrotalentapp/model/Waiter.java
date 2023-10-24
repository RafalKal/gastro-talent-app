package com.java.gastrotalentapp.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
@SuperBuilder(toBuilder = true)

@Entity
public class Waiter extends Employee {
    private String otherSpeciality;

    public String getOtherSpeciality() {
        return otherSpeciality;
    }

    public void setOtherSpeciality(String speciality) {
        this.otherSpeciality = speciality;
    }
}
