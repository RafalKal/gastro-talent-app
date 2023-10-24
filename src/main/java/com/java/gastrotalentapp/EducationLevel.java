package com.java.gastrotalentapp;

public enum EducationLevel {
    ELEMENTARY("Elementary"),
    SECONDARY("Secondary"),
    VOCATIONAL("Vocational"),
    HIGHER("Higher"),
    MASTER("Master"),
    DOCTORATE("Doctorate");

    private final String displayName;

    EducationLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getName() {
        return displayName;
    }
}
