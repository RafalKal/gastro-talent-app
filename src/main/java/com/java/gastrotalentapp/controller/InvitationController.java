package com.java.gastrotalentapp.controller;

import com.java.gastrotalentapp.enums.InvitationStatus;
import com.java.gastrotalentapp.model.entity.Invitation;
import com.java.gastrotalentapp.requests_responses.requests.InvitationRequest;
import com.java.gastrotalentapp.service.InvitationService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/invitations")
public class InvitationController {

  private final InvitationService invitationService;

  @Autowired
  public InvitationController(InvitationService invitationService) {
    this.invitationService = invitationService;
  }

  @PostMapping
  public Invitation createInvitation(@RequestBody InvitationRequest invitationRequest) {
    return invitationService.createInvitation(invitationRequest);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Invitation> updateInvitation(
      @PathVariable Long id, @RequestBody InvitationRequest invitationRequest) {
    return invitationService
        .updateInvitation(id, invitationRequest)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/status/{status}")
  public List<Invitation> findByStatus(@PathVariable InvitationStatus status) {
    return invitationService.findByStatus(status);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Invitation> findById(@PathVariable Long id) {
    return invitationService
        .findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteInvitation(@PathVariable Long id) {
    invitationService.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/employer/{employerId}")
  public List<Invitation> findByEmployerId(@PathVariable Long employerId) {
    return invitationService.findByEmployerId(employerId);
  }

  @GetMapping("/cook/{cookId}")
  public List<Invitation> findByCookId(@PathVariable Long cookId) {
    return invitationService.findByCookId(cookId);
  }

  @GetMapping("/interview-date")
  public List<Invitation> findByInterviewDateBetween(
      @RequestParam("start") LocalDateTime start, @RequestParam("end") LocalDateTime end) {
    return invitationService.findByInterviewDateBetween(start, end);
  }

  @GetMapping("/count/employer/{employerId}")
  public long countByEmployerId(@PathVariable Long employerId) {
    return invitationService.countByEmployerId(employerId);
  }
}
