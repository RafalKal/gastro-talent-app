package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.Cook;
import com.java.gastrotalentapp.repository.CookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CookService {
    private final CookRepository cookRepository;

    @Autowired
    public CookService(CookRepository cookRepository) {
        this.cookRepository = cookRepository;
    }

    public List<Cook> getAllCooks() {
        return cookRepository.findAll();
    }

    public Cook getCookById(Long id) {
        return cookRepository.findById(id).orElse(null);
    }

    public Cook saveCook(Cook cook) {
        return cookRepository.save(cook);
    }

    public void deleteCook(Long id) {
        cookRepository.deleteById(id);
    }
}
