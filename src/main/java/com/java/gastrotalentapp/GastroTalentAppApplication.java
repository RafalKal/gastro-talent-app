package com.java.gastrotalentapp;

import com.java.gastrotalentapp.service.CookService;
import com.java.gastrotalentapp.service.EmployeeService;
import com.java.gastrotalentapp.service.WaiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GastroTalentAppApplication {

  @Autowired CookService cookService;
  @Autowired WaiterService waiterService;
  @Autowired EmployeeService employeeService;

  public static void main(String[] args) {
    SpringApplication.run(GastroTalentAppApplication.class, args);
  }
}
