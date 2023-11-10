//package com.java.gastrotalentapp.builders;
//
//import com.java.gastrotalentapp.model.entity.Waiter;
//import com.java.gastrotalentapp.repository.UserRepository;
//import com.java.gastrotalentapp.requests_responses.requests.WaiterRequest;
//import javax.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//public class WaiterBuilder {
//
//  // builder method for creating new object.
//  public static Waiter buildUsingRequest(WaiterRequest request, UserRepository userRepository) {
//    return Waiter.builder()
//        .education(request.getEducation())
//        .professionalExperience(request.getProfessionalExperience())
//        .user(
//            userRepository
//                .findById(request.getUserId())
//                .orElseThrow(
//                    () ->
//                        new EntityNotFoundException(
//                            "User not found with id: " + request.getUserId())))
//        .hasWineKnowledge(request.getHasWineKnowledge())
//        .canHandleLargeParties(request.getCanHandleLargeParties())
//        .isCertifiedSommelier(request.getIsCertifiedSommelier())
//        .isTrainedInMixology(request.getIsTrainedInMixology())
//        .preferredServingStyle(request.getPreferredServingStyle())
//        .build();
//  }
//
//  // builder method for updating existing object.
//  public static Waiter buildUsingRequest(
//      Long waiterId, WaiterRequest request, Long userId, UserRepository userRepository) {
//    return Waiter.builder()
//        .id(waiterId)
//        .education(request.getEducation())
//        .professionalExperience(request.getProfessionalExperience())
//        .user(
//            userRepository
//                .findById(userId)
//                .orElseThrow(
//                    () ->
//                        new EntityNotFoundException(
//                            "User not found with id: " + request.getUserId())))
//        .hasWineKnowledge(request.getHasWineKnowledge())
//        .canHandleLargeParties(request.getCanHandleLargeParties())
//        .isCertifiedSommelier(request.getIsCertifiedSommelier())
//        .isTrainedInMixology(request.getIsTrainedInMixology())
//        .preferredServingStyle(request.getPreferredServingStyle())
//        .build();
//  }
//}
