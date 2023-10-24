package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.Waiter;
import com.java.gastrotalentapp.repository.WaitressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WaiterService {

    private final WaitressRepository waitressRepository;

    @Autowired
    public WaiterService(WaitressRepository waitressRepository) {
        this.waitressRepository = waitressRepository;
    }

    public List<Waiter> getAllWaitresses() {
        return waitressRepository.findAll();
    }

    public Optional<Waiter> getWaitressById(Long id) {
        return waitressRepository.findById(id);
    }

    public Waiter createWaitress(Waiter waiter) {
        return waitressRepository.save(waiter);
    }

    public Waiter updateWaitress(Long id, Waiter updatedWaiter) {
        if (waitressRepository.existsById(id)) {
            updatedWaiter.setId(id);
            return waitressRepository.save(updatedWaiter);
        } else {
            throw new IllegalArgumentException("Waitress with ID " + id + " not found.");
        }
    }

    public void deleteWaitress(Long id) {
        waitressRepository.deleteById(id);
    }
}
