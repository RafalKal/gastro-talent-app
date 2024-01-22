package com.java.gastrotalentapp.requests_responses.requests;

import com.java.gastrotalentapp.enums.InvitationStatus;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvitationRequest {

  private long employerId;

  private long cookId;

  private InvitationStatus status;

  private LocalDateTime interviewDate;
}
