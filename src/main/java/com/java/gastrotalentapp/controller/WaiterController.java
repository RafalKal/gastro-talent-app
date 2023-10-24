package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.model.Waiter;
import com.java.gastrotalentapp.service.WaiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/waitresses")
public class WaiterController {

    private final WaiterService waiterService;

    @Autowired
    public WaiterController(WaiterService waiterService) {
        this.waiterService = waiterService;
    }

    @GetMapping
    public List<Waiter> getAllWaitresses() {
        return waiterService.getAllWaitresses();
    }

    @GetMapping("/{id}")
    public Optional<Waiter> getWaitressById(@PathVariable Long id) {
        return waiterService.getWaitressById(id);
    }

    @PostMapping
    public Waiter addWaitress(@RequestBody Waiter waiter) {
        return waiterService.createWaitress(waiter);
    }

    @PutMapping("/{id}")
    public Waiter updateWaitress(@PathVariable Long id, @RequestBody Waiter updatedWaiter) {
        return waiterService.updateWaitress(id, updatedWaiter);
    }

    @DeleteMapping("/{id}")
    public void deleteWaitress(@PathVariable Long id) {
        waiterService.deleteWaitress(id);
    }
}
