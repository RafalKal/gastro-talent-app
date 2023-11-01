package com.java.gastrotalentapp.enums;

public enum CookingStyle {
    POLISH_CUISINE("Polish Cuisine"),            // Kuchnia Polska
    FRENCH_CUISINE("French Cuisine"),            // Kuchnia Francuska
    ITALIAN_CUISINE("Italian Cuisine"),          // Kuchnia Włoska
    SPANISH_CUISINE("Spanish Cuisine"),          // Kuchnia Hiszpańska
    MEXICAN_CUISINE("Mexican Cuisine"),          // Kuchnia Meksykańska
    JAPANESE_CUISINE("Japanese Cuisine"),        // Kuchnia Japońska
    INDIAN_CUISINE("Indian Cuisine"),            // Kuchnia Indyjska
    THAI_CUISINE("Thai Cuisine"),                // Kuchnia Tajska
    GREEK_CUISINE("Greek Cuisine"),              // Kuchnia Grecka
    AMERICAN_CUISINE("American Cuisine"),        // Kuchnia Amerykańska
    CHINESE_CUISINE("Chinese Cuisine"),          // Kuchnia Chińska
    GERMAN_CUISINE("German Cuisine"),            // Kuchnia Niemiecka
    BRAZILIAN_CUISINE("Brazilian Cuisine"),      // Kuchnia Brazylijska
    RUSSIAN_CUISINE("Russian Cuisine"),          // Kuchnia Rosyjska
    KOREAN_CUISINE("Korean Cuisine"),            // Kuchnia Koreańska
    VIETNAMESE_CUISINE("Vietnamese Cuisine"),    // Kuchnia Wietnamska
    MOROCCAN_CUISINE("Moroccan Cuisine"),        // Kuchnia Marokańska
    ETHIOPIAN_CUISINE("Ethiopian Cuisine"),      // Kuchnia Etiopska
    CAJUN_CUISINE("Georgian Cuisine"),           // Kuchnia Gruzińska
    CARIBBEAN_CUISINE("Caribbean Cuisine"),      // Kuchnia Karaibska
    AUSTRALIAN_CUISINE("Australian Cuisine");    // Kuchnia Australijska

    private final String displayName;

    CookingStyle(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
