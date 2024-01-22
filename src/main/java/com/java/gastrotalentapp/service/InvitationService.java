package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.builders.InvitationBuilder;
import com.java.gastrotalentapp.enums.InvitationStatus;
import com.java.gastrotalentapp.model.entity.Invitation;
import com.java.gastrotalentapp.repository.CookRepository;
import com.java.gastrotalentapp.repository.EmployerRepository;
import com.java.gastrotalentapp.repository.InvitationRepository;
import com.java.gastrotalentapp.requests_responses.requests.InvitationRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InvitationService {

  private final InvitationRepository invitationRepository;
  private final CookRepository cookRepository;
  private final EmployerRepository employerRepository;

  @Autowired
  public InvitationService(
      InvitationRepository invitationRepository,
      CookRepository cookRepository,
      EmployerRepository employerRepository) {
    this.invitationRepository = invitationRepository;
    this.cookRepository = cookRepository;
    this.employerRepository = employerRepository;
  }

  @Transactional
  public Invitation createInvitation(InvitationRequest invitationRequest) {
    Invitation newInvitation =
        InvitationBuilder.buildUsingRequest(invitationRequest, cookRepository, employerRepository);
    return invitationRepository.save(newInvitation);
  }

  @Transactional
  public Optional<Invitation> updateInvitation(
      Long id, InvitationRequest updatedInvitationRequest) {
    return Optional.ofNullable(
        invitationRepository
            .findById(id)
            .map(
                existingInvitation -> {
                  Invitation updatedInvitation =
                      InvitationBuilder.buildUsingRequest(
                          updatedInvitationRequest,
                          existingInvitation.getId(),
                          cookRepository,
                          employerRepository);

                  return invitationRepository.save(updatedInvitation);
                })
            .orElseThrow(() -> new EntityNotFoundException("Invitation not found with id: " + id)));
  }

  public List<Invitation> findByStatus(InvitationStatus status) {
    return invitationRepository.findByStatus(status);
  }

  public Optional<Invitation> findById(Long id) {
    return invitationRepository.findById(id);
  }

  @Transactional
  public void deleteById(Long id) {
    invitationRepository.deleteById(id);
  }

  public List<Invitation> findByEmployerId(Long employerId) {
    return invitationRepository.findByEmployerId(employerId);
  }

  public List<Invitation> findByCookId(Long cookId) {
    return invitationRepository.findByCookId(cookId);
  }

  public List<Invitation> findByInterviewDateBetween(LocalDateTime start, LocalDateTime end) {
    return invitationRepository.findByInterviewDateBetween(start, end);
  }

  public long countByEmployerId(Long employerId) {
    return invitationRepository.countByEmployerId(employerId);
  }
}
