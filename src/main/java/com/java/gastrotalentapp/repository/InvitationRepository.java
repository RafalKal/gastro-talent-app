package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.enums.InvitationStatus;
import com.java.gastrotalentapp.model.entity.Invitation;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {

  List<Invitation> findByEmployerId(Long employerId);

  List<Invitation> findByCookId(Long cookId);

  List<Invitation> findByStatus(InvitationStatus status);

  List<Invitation> findByInterviewDateBetween(LocalDateTime start, LocalDateTime end);

  List<Invitation> findByInterviewDateIsNull();

  List<Invitation> findByCreatedAtBefore(LocalDateTime date);

  List<Invitation> findByUpdatedAtAfter(LocalDateTime date);

  List<Invitation> findByStatusAndCookId(InvitationStatus status, Long cookId);

  List<Invitation> findByStatusAndEmployerId(InvitationStatus status, Long employerId);

  long countByEmployerId(Long employerId);
}
