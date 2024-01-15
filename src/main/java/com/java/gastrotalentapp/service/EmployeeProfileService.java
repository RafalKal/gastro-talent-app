package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.entity.Employee;
import com.java.gastrotalentapp.model.entity.EmployeeProfile;
import com.java.gastrotalentapp.model.entity.Waiter;
import com.java.gastrotalentapp.repository.EmployeeProfileRepository;
import com.java.gastrotalentapp.repository.EmployeeRepository;
import com.java.gastrotalentapp.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeProfileService {

  private final EmployeeProfileRepository employeeProfileRepository;
  private final EmployeeRepository employeeRepository;

  public List<EmployeeProfile> getAllEmployeeProfiles() {
    return employeeProfileRepository.findAll();
  }

  public Optional<EmployeeProfile> getEmployeeProfileById(Long id) {
    return employeeProfileRepository.findById(id);
  }

  public boolean deleteEmployeeProfile(Long id) {
    if (employeeProfileRepository.existsById(id)) {
      employeeProfileRepository.deleteById(id);
      return true;
    } else {
      return false;
    }
  }

  @EventListener(ContextRefreshedEvent.class)
  public void onApplicationEvent(ContextRefreshedEvent event) {
    // TODO: getAllEmployeeProfiles();
    // TODO: getEmployeeProfile(Long id);
    // TODO: getEmployeeProfilesByProfession();
    // TODO: getEmployeeProfilesBy[...]]();
    // List<EmployeeProfile> employeeProfiles = employeeProfileRepository.
//    Waiter waiter =
//        Waiter.builder()
//            .employee(employeeRepository.findById(null))
//            .education()
//            .professionalExperiences()
//            .canHandleLargeParties()
//            .hasWineKnowledge()
//            .isTrainedInMixology()
//            .isCertifiedSommelier()
//            .preferredServingStyle()
//            .canHandleLargeParties()
//            .profession()
//            .build();
  }
}
