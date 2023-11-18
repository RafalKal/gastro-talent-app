package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.builders.CookBuilder;
import com.java.gastrotalentapp.model.entity.Cook;
import com.java.gastrotalentapp.repository.CookRepository;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.requests_responses.requests.CookRequest;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CookService {

  private final CookRepository cookRepository;
  private final UserRepository userRepository;

  public List<Cook> getAllCooks() {
    return cookRepository.findAll();
  }

  public Optional<Cook> getCookById(Long id) {
    return cookRepository.findById(id);
  }

  public Cook createCook(CookRequest request) {
    Cook cook = CookBuilder.buildUsingRequest(request, userRepository);
    return cookRepository.save(cook);
  }

  public Cook updateCook(Long id, CookRequest request) {
    if (cookRepository.existsById(id)) {
      Cook updatedCook =
          CookBuilder.buildUsingRequest(
              id, request, cookRepository.findById(id).get().getEmployee().getId(), userRepository);
      return cookRepository.save(updatedCook);
    } else {
      throw new IllegalArgumentException("Cook with ID " + id + " not found.");
    }
  }

  public boolean deleteCook(Long id) {
    if (cookRepository.existsById(id)) {
      cookRepository.deleteById(id);
      return true;
    } else {
      return false;
    }
  }
}
