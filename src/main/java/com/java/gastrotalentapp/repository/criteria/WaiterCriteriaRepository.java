//package com.java.gastrotalentapp.repository.criteria;
//
//import com.java.gastrotalentapp.model.entity.Waiter;
//import com.java.gastrotalentapp.model.entity.criteria.WaiterSearchCriteria;
//import com.java.gastrotalentapp.model.entity.page.WaiterPage;
//import java.util.ArrayList;
//import java.util.List;
//import javax.persistence.EntityManager;
//import javax.persistence.TypedQuery;
//import javax.persistence.criteria.*;
//import org.springframework.data.domain.*;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class WaiterCriteriaRepository {
//
//  private final EntityManager entityManager;
//  private final CriteriaBuilder criteriaBuilder;
//
//  public WaiterCriteriaRepository(EntityManager entityManager) {
//    this.entityManager = entityManager;
//    this.criteriaBuilder = entityManager.getCriteriaBuilder();
//  }
//
//
//  public Page<Waiter> findAllWithFilters(
//      WaiterPage waiterPage, WaiterSearchCriteria waiterSearchCriteria) {
//    CriteriaQuery<Waiter> criteriaQuery = criteriaBuilder.createQuery(Waiter.class);
//    Root<Waiter> waiterRoot = criteriaQuery.from(Waiter.class);
//    Predicate predicate = getPredicate(waiterSearchCriteria, waiterRoot);
//    criteriaQuery.where(predicate);
//    setOrder(waiterPage, criteriaQuery, waiterRoot);
//
//    TypedQuery<Waiter> typedQuery = entityManager.createQuery(criteriaQuery);
//    typedQuery.setFirstResult(waiterPage.getPageNumber() * waiterPage.getPageSize());
//    typedQuery.setMaxResults(waiterPage.getPageSize());
//    Pageable pageable = getPageable(waiterPage);
//    long waitersCount = getWaitersCount(predicate);
//
//    return new PageImpl<>(typedQuery.getResultList(), pageable, waitersCount);
//  }
//
//  private Predicate getPredicate(
//      WaiterSearchCriteria waiterSearchCriteria, Root<Waiter> waiterRoot) {
//    List<Predicate> predicates = new ArrayList<>();
//
//    //    if (Objects.nonNull(waiterSearchCriteria.getFirstname())) {
//    //      predicates.add(
//    //              criteriaBuilder.like(
//    //                      waiterRoot.get("firstname"),
//    //                      "" + waiterSearchCriteria.getFirstname() + ""));
//    //    }
//    //
//    //    if (Objects.nonNull(waiterSearchCriteria.getHasWineKnowledge())) {
//    //      predicates.add(
//    //          criteriaBuilder.like(
//    //              waiterRoot.get("hasWineKnowledge"),
//    //              "" + waiterSearchCriteria.getHasWineKnowledge() + ""));
//    //    }
//    //
//    //    if (Objects.nonNull(waiterSearchCriteria.getCanHandleLargeParties())) {
//    //      predicates.add(
//    //          criteriaBuilder.like(
//    //              waiterRoot.get("canHandleLargeParties"),
//    //              "" + waiterSearchCriteria.getCanHandleLargeParties() + ""));
//    //    }
//    //
//    //    if (Objects.nonNull(waiterSearchCriteria.getIsCertifiedSommelier())) {
//    //      predicates.add(
//    //          criteriaBuilder.equal(
//    //              waiterRoot.get("isCertifiedSommelier"),
//    //              "" + waiterSearchCriteria.getIsCertifiedSommelier() + ""));
//    //    }
//    //
//    //    if (Objects.nonNull(waiterSearchCriteria.getPreferredServingStyle())) {
//    //      predicates.add(
//    //          criteriaBuilder.equal(
//    //              waiterRoot.get("preferredServingStyle"),
//    //              "%" + waiterSearchCriteria.getPreferredServingStyle() + "%"));
//    //    }
//    //
//    //    if (Objects.nonNull(waiterSearchCriteria.getIsTrainedInMixology())) {
//    //      predicates.add(
//    //          criteriaBuilder.equal(
//    //              waiterRoot.get("isTrainedInMixology"),
//    //              "" + waiterSearchCriteria.getIsTrainedInMixology() + ""));
//    //    }
//    return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
//  }
//
//  private void setOrder(
//      WaiterPage waiterPage, CriteriaQuery<Waiter> criteriaQuery, Root<Waiter> waiterRoot) {
//    if (waiterPage.getSortDirection().equals(Sort.Direction.ASC)) {
//      criteriaQuery.orderBy(criteriaBuilder.asc(waiterRoot.get(waiterPage.getSortBy())));
//    } else {
//      criteriaQuery.orderBy(criteriaBuilder.desc(waiterRoot.get(waiterPage.getSortBy())));
//    }
//  }
//
//  private long getWaitersCount(Predicate predicate) {
//    CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
//    Root<Waiter> countRoot = countQuery.from(Waiter.class);
//    countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
//    return entityManager.createQuery(countQuery).getSingleResult();
//  }
//
//  private Pageable getPageable(WaiterPage waiterPage) {
//    Sort sort = Sort.by(waiterPage.getSortDirection(), waiterPage.getSortBy());
//    return PageRequest.of(waiterPage.getPageNumber(), waiterPage.getPageSize(), sort);
//  }
//}
