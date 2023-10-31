package com.java.gastrotalentapp.repository;

import com.java.gastrotalentapp.model.Waiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaitressRepository extends JpaRepository<Waiter, Long> {}
