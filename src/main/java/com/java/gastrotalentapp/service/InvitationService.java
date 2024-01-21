package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.enums.InvitationStatus;
import com.java.gastrotalentapp.model.entity.Invitation;
import com.java.gastrotalentapp.repository.InvitationRepository;
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

  @Autowired
  public InvitationService(InvitationRepository invitationRepository) {
    this.invitationRepository = invitationRepository;
  }

  @Transactional
  public Invitation createInvitation(Invitation invitation) {
    return invitationRepository.save(invitation);
  }

  @Transactional
  public Optional<Invitation> updateInvitation(Long id, Invitation updatedInvitation) {
    return Optional.ofNullable(
        invitationRepository
            .findById(id)
            .map(
                invitation -> {
                  if (updatedInvitation.getEmployer() != null) {
                    invitation.setEmployer(updatedInvitation.getEmployer());
                  }
                  if (updatedInvitation.getCook() != null) {
                    invitation.setCook(updatedInvitation.getCook());
                  }
                  if (updatedInvitation.getStatus() != null) {
                    invitation.setStatus(updatedInvitation.getStatus());
                  }
                  if (updatedInvitation.getInterviewDate() != null) {
                    invitation.setInterviewDate(updatedInvitation.getInterviewDate());
                  }

                  invitation.setUpdatedAt(LocalDateTime.now());

                  return invitationRepository.save(invitation);
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
