package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.Cook;
import com.java.gastrotalentapp.service.CookService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cooks")
public class CookController {
  private final CookService cookService;

  @Autowired
  public CookController(CookService cookService) {
    this.cookService = cookService;
  }

  @GetMapping("/")
  public List<Cook> getAllCooks() {
    return cookService.getAllCooks();
  }

  @GetMapping("/{id}")
  public Cook getCookById(@PathVariable Long id) {
    return cookService.getCookById(id);
  }

  @PostMapping("/")
  public Cook addCook(@RequestBody Cook cook) {
    return cookService.saveCook(cook);
  }

  @PutMapping("/{id}")
  public Cook updateCook(@PathVariable Long id, @RequestBody Cook cook) {
    cook.setId(id);
    return cookService.saveCook(cook);
  }

  @DeleteMapping("/{id}")
  public void deleteCook(@PathVariable Long id) {
    cookService.deleteCook(id);
  }
}
