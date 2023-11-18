package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.model.entity.Waiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaiterRepository extends JpaRepository<Waiter, Long> {}
