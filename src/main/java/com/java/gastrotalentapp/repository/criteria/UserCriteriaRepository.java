package com.java.gastrotalentapp.repository.criteria;

import com.java.gastrotalentapp.model.entity.User;
import com.java.gastrotalentapp.model.entity.criteria.UserSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.UserPage;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

@Repository
public class UserCriteriaRepository {

  private final EntityManager entityManager;
  private final CriteriaBuilder criteriaBuilder;

  public UserCriteriaRepository(EntityManager entityManager) {
    this.entityManager = entityManager;
    this.criteriaBuilder = entityManager.getCriteriaBuilder();
  }

  public Page<User> findAllwithFilters(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
    Root<User> userRoot = criteriaQuery.from(User.class);
    Predicate predicate = getPredicate(userSearchCriteria, userRoot);
    criteriaQuery.where(predicate);
    setOrder(userPage, criteriaQuery, userRoot);

    TypedQuery<User> typedQuery = entityManager.createQuery(criteriaQuery);
    typedQuery.setFirstResult(userPage.getPageNumber() * userPage.getPageSize());
    typedQuery.setMaxResults(userPage.getPageSize());
    Pageable pageable = getPageable(userPage);
    long usersCount = getUsersCount(predicate);

    return new PageImpl<>(typedQuery.getResultList(), pageable, usersCount);
  }

  private Predicate getPredicate(UserSearchCriteria userSearchCriteria, Root<User> userRoot) {
    List<Predicate> predicates = new ArrayList<>();
    if (Objects.nonNull(userSearchCriteria.getFirstname())) {
      predicates.add(
          criteriaBuilder.like(
              userRoot.get("firstname"), "%" + userSearchCriteria.getFirstname() + "%"));
    }

    if (Objects.nonNull(userSearchCriteria.getLastname())) {
      predicates.add(
          criteriaBuilder.like(
              userRoot.get("lastname"), "%" + userSearchCriteria.getLastname() + "%"));
    }

    if (Objects.nonNull(userSearchCriteria.getEmail())) {
      predicates.add(
          criteriaBuilder.like(userRoot.get("email"), "%" + userSearchCriteria.getEmail() + "%"));
    }

    if (Objects.nonNull(userSearchCriteria.getPhoneNumber())) {
      predicates.add(
          criteriaBuilder.equal(userRoot.get("phoneNumber"), userSearchCriteria.getPhoneNumber()));
    }

    if (Objects.nonNull(userSearchCriteria.getDateOfBirth())) {
      predicates.add(
          criteriaBuilder.equal(userRoot.get("dateOfBirth"), userSearchCriteria.getDateOfBirth()));
    }
    if (Objects.nonNull(userSearchCriteria.getDateOfBirthGreater())) {
      predicates.add(
          criteriaBuilder.greaterThanOrEqualTo(
              userRoot.get("dateOfBirth"), userSearchCriteria.getDateOfBirthGreater()));
    }
    if (Objects.nonNull(userSearchCriteria.getDateOfBirthLess())) {
      predicates.add(
          criteriaBuilder.lessThanOrEqualTo(
              userRoot.get("dateOfBirth"), userSearchCriteria.getDateOfBirthLess()));
    }

    if (Objects.nonNull(userSearchCriteria.getCreatedAt())) {
      predicates.add(
          criteriaBuilder.equal(userRoot.get("createdAt"), userSearchCriteria.getCreatedAt()));
    }
    if (Objects.nonNull(userSearchCriteria.getDateOfBirthGreater())) {
      predicates.add(
          criteriaBuilder.greaterThanOrEqualTo(
              userRoot.get("createdAt"), userSearchCriteria.getDateOfCreationGreater()));
    }
    if (Objects.nonNull(userSearchCriteria.getDateOfBirthLess())) {
      predicates.add(
          criteriaBuilder.lessThanOrEqualTo(
              userRoot.get("createdAt"), userSearchCriteria.getDateOfCreationLess()));
    }

    if (Objects.nonNull(userSearchCriteria.getCreatedAt())) {
      predicates.add(
          criteriaBuilder.equal(userRoot.get("updatedAt"), userSearchCriteria.getUpdatedAt()));
    }
    if (Objects.nonNull(userSearchCriteria.getDateOfBirthGreater())) {
      predicates.add(
          criteriaBuilder.greaterThanOrEqualTo(
              userRoot.get("updatedAt"), userSearchCriteria.getDateOfUpdateGreater()));
    }
    if (Objects.nonNull(userSearchCriteria.getDateOfBirthLess())) {
      predicates.add(
          criteriaBuilder.lessThanOrEqualTo(
              userRoot.get("updatedAt"), userSearchCriteria.getDateOfUpdateLess()));
    }
    return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
  }

  private void setOrder(UserPage userPage, CriteriaQuery<User> criteriaQuery, Root<User> userRoot) {
    if (userPage.getSortDirection().equals(Sort.Direction.ASC)) {
      criteriaQuery.orderBy(criteriaBuilder.asc(userRoot.get(userPage.getSortBy())));
    } else {
      criteriaQuery.orderBy(criteriaBuilder.desc(userRoot.get(userPage.getSortBy())));
    }
  }

  private long getUsersCount(Predicate predicate) {
    CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
    Root<User> countRoot = countQuery.from(User.class);
    countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
    return entityManager.createQuery(countQuery).getSingleResult();
  }

  private Pageable getPageable(UserPage userPage) {
    Sort sort = Sort.by(userPage.getSortDirection(), userPage.getSortBy());
    return PageRequest.of(userPage.getPageNumber(), userPage.getPageSize(), sort);
  }
}
