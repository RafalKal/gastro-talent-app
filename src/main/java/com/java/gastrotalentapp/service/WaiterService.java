//package com.java.gastrotalentapp.service;
//
//import com.java.gastrotalentapp.builders.WaiterBuilder;
//import com.java.gastrotalentapp.model.entity.Waiter;
//import com.java.gastrotalentapp.model.entity.criteria.WaiterSearchCriteria;
//import com.java.gastrotalentapp.model.entity.page.WaiterPage;
//import com.java.gastrotalentapp.repository.UserRepository;
//import com.java.gastrotalentapp.repository.WaiterRepository;
//import com.java.gastrotalentapp.repository.criteria.WaiterCriteriaRepository;
//import com.java.gastrotalentapp.requests_responses.requests.WaiterRequest;
//import java.util.Optional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class WaiterService {
//
//  private final WaiterRepository waiterRepository;
//  private final WaiterCriteriaRepository waiterCriteriaRepository;
//  private final UserRepository userRepository;
//
//  public Page<Waiter> getWaiters(WaiterPage waiterPage, WaiterSearchCriteria waiterSearchCriteria) {
//    return waiterCriteriaRepository.findAllWithFilters(waiterPage, waiterSearchCriteria);
//  }
//
//  public Optional<Waiter> getWaiterById(Long id) {
//    return waiterRepository.findById(id);
//  }
//
//  public Waiter createWaiter(WaiterRequest request) {
//    Waiter waiter = WaiterBuilder.buildUsingRequest(request, userRepository);
//    return waiterRepository.save(waiter);
//  }
//
//  public Waiter updateWaiter(Long id, WaiterRequest request) {
//    if (waiterRepository.existsById(id)) {
//      Waiter updatedWaiter =
//          WaiterBuilder.buildUsingRequest(
//              id, request, waiterRepository.findById(id).get().getEmployee().getId(), userRepository);
//      return waiterRepository.save(updatedWaiter);
//    } else {
//      throw new IllegalArgumentException("Waiter with ID " + id + " not found.");
//    }
//  }
//
//  public boolean deleteWaiter(Long id) {
//    if (waiterRepository.existsById(id)) {
//      waiterRepository.deleteById(id);
//      return true;
//    } else {
//      return false;
//    }
//  }
//}
