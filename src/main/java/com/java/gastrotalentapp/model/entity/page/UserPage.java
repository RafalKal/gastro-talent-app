package com.java.gastrotalentapp.model.entity.page;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class UserPage {

  private int pageNumber = 0;

  private int pageSize = 10;

  private Sort.Direction sortDirection = Sort.Direction.ASC;

  private String sortBy = "lastname";
}
