package com.java.gastrotalentapp;

public enum Profession {
  COOK("Cook"), // Kucharz
  WAITER("Waitress"), // Kelner
  BREWER("Brewer"), // Piwowar
  NUTRITION_SPECIALIST("NutritionSpecialist"), // Specjalista Żywienia
  BARTENDER("Bartender"), // Barman
  CULINARY_CRITIC("CulinaryCritic"), // Krytyk Kulinarny
  ORGANIZER_OF_CATERING_SERVICES("OrganizerOfCateringServices"), // Organizator Usług Cateringowych
  BARISTA("Barista"), // Barista
  RESTAURANT_MANAGER("RestaurantManager"), // Menedżer Restauracji
  FOOD_SUPPLIER("FoodSupplier"), // Dostawca Potraw
  SOMMELIER("Sommelier"), // Sommelier
  FOOD_TECHNOLOGIST("FoodTechnologist"), // Technolog Żywności
  BAKER("Baker"), // Piekarz
  CONFECTIONER("Confectioner"), // Cukiernik
  DIETITIAN("Dietitian"); // Dietetyk

  private final String displayName;

  Profession(String displayName) {
    this.displayName = displayName;
  }

  public String getName() {
    return displayName;
  }
}
