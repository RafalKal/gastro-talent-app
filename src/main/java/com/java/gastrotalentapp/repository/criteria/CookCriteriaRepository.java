package com.java.gastrotalentapp.repository.criteria;

import com.java.gastrotalentapp.model.entity.Cook;
import com.java.gastrotalentapp.model.entity.criteria.CookSearchCriteria;
import com.java.gastrotalentapp.model.entity.page.CookPage;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

@Repository
public class CookCriteriaRepository {

  private final EntityManager entityManager;
  private final CriteriaBuilder criteriaBuilder;

  public CookCriteriaRepository(EntityManager entityManager) {
    this.entityManager = entityManager;
    this.criteriaBuilder = entityManager.getCriteriaBuilder();
  }

  public Page<Cook> findAllWithFilters(CookPage cookPage, CookSearchCriteria cookSearchCriteria) {
    CriteriaQuery<Cook> criteriaQuery = criteriaBuilder.createQuery(Cook.class);
    Root<Cook> cookRoot = criteriaQuery.from(Cook.class);
    Predicate predicate = getPredicate(cookSearchCriteria, cookRoot);
    criteriaQuery.where(predicate);
    setOrder(cookPage, criteriaQuery, cookRoot);

    TypedQuery<Cook> typedQuery = entityManager.createQuery(criteriaQuery);
    typedQuery.setFirstResult(cookPage.getPageNumber() * cookPage.getPageSize());
    typedQuery.setMaxResults(cookPage.getPageSize());
    Pageable pageable = getPageable(cookPage);
    long waitersCount = getCooksCount(predicate);

    return new PageImpl<>(typedQuery.getResultList(), pageable, waitersCount);
  }

  private Predicate getPredicate(CookSearchCriteria cookSearchCriteria, Root<Cook> cookRoot) {
    List<Predicate> predicates = new ArrayList<>();

    //        if (Objects.nonNull(cookSearchCriteria.getFirstname())) {
    //            predicates.add(
    //                    criteriaBuilder.like(
    //                            cookRoot.get("firstname"),
    //                            "" + cookSearchCriteria.getFirstname() + ""));
    //        }
    //
    //        if (Objects.nonNull(cookSearchCriteria.getHasWineKnowledge())) {
    //            predicates.add(
    //                    criteriaBuilder.like(
    //                            cookRoot.get("hasWineKnowledge"),
    //                            "" + cookSearchCriteria.getHasWineKnowledge() + ""));
    //        }
    //
    //        if (Objects.nonNull(cookSearchCriteria.getCanHandleLargeParties())) {
    //            predicates.add(
    //                    criteriaBuilder.like(
    //                            cookRoot.get("canHandleLargeParties"),
    //                            "" + cookSearchCriteria.getCanHandleLargeParties() + ""));
    //        }
    //
    //        if (Objects.nonNull(cookSearchCriteria.getIsCertifiedSommelier())) {
    //            predicates.add(
    //                    criteriaBuilder.equal(
    //                            cookRoot.get("isCertifiedSommelier"),
    //                            "" + cookSearchCriteria.getIsCertifiedSommelier() + ""));
    //        }
    //
    //        if (Objects.nonNull(cookSearchCriteria.getPreferredServingStyle())) {
    //            predicates.add(
    //                    criteriaBuilder.equal(
    //                            cookRoot.get("preferredServingStyle"),
    //                            "%" + cookSearchCriteria.getPreferredServingStyle() + "%"));
    //        }
    //
    //        if (Objects.nonNull(cookSearchCriteria.getIsTrainedInMixology())) {
    //            predicates.add(
    //                    criteriaBuilder.equal(
    //                            cookRoot.get("isTrainedInMixology"),
    //                            "" + cookSearchCriteria.getIsTrainedInMixology() + ""));
    //        }
    return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
  }

  private void setOrder(CookPage cookPage, CriteriaQuery<Cook> criteriaQuery, Root<Cook> cookRoot) {
    if (cookPage.getSortDirection().equals(Sort.Direction.ASC)) {
      criteriaQuery.orderBy(criteriaBuilder.asc(cookRoot.get(cookPage.getSortBy())));
    } else {
      criteriaQuery.orderBy(criteriaBuilder.desc(cookRoot.get(cookPage.getSortBy())));
    }
  }

  private long getCooksCount(Predicate predicate) {
    CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
    Root<Cook> countRoot = countQuery.from(Cook.class);
    countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
    return entityManager.createQuery(countQuery).getSingleResult();
  }

  private Pageable getPageable(CookPage cookPage) {
    Sort sort = Sort.by(cookPage.getSortDirection(), cookPage.getSortBy());
    return PageRequest.of(cookPage.getPageNumber(), cookPage.getPageSize(), sort);
  }
}
