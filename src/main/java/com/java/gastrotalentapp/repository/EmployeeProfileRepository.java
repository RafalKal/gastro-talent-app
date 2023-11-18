package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.model.entity.EmployeeProfile;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long> {
  List<EmployeeProfile> findByEmployee_Id(Long employeeId);
}
