package com.java.gastrotalentapp.service;

import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import com.java.gastrotalentapp.repository.UserRepository;
import com.java.gastrotalentapp.repository.criteria.UserCriteriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserCriteriaRepository userCriteriaRepository;

  public Page<User> getUsers(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return userCriteriaRepository.findAllwithFilters(userPage, userSearchCriteria);
  }
}