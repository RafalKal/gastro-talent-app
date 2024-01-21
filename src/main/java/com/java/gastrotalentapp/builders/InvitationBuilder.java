package com.java.gastrotalentapp.builders;

import com.java.gastrotalentapp.model.entity.Invitation;
import com.java.gastrotalentapp.repository.*;
import com.java.gastrotalentapp.requests_responses.requests.InvitationRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class InvitationBuilder {

  // builder method for creating new object.
  public static Invitation buildUsingRequest(
      InvitationRequest request,
      CookRepository cookRepository,
      EmployerRepository employerRepository) {

    return Invitation.builder()
        .cook(cookRepository.findById(request.getCookId()).get())
        .employer(employerRepository.findById(request.getEmployerId()).get())
        .interviewDate(request.getInterviewDate())
        .status(request.getStatus())
        .build();
  }

  // builder method for updating existing object.
  public static Invitation buildUsingRequest(
      InvitationRequest request,
      Long cookId,
      CookRepository cookRepository,
      EmployerRepository employerRepository) {

    return Invitation.builder()
        .id(cookId)
        .cook(cookRepository.findById(request.getCookId()).get())
        .employer(employerRepository.findById(request.getEmployerId()).get())
        .interviewDate(request.getInterviewDate())
        .status(request.getStatus())
        .build();
  }
}
