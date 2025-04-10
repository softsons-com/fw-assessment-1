package com.flywire.exercise.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flywire.exercise.domain.model.Employ;

import java.util.List;

@Repository
public interface EmployRepository extends JpaRepository<Employ, Integer> {
    List<Employ> findByActiveTrue();

    List<Employ> findByPosition(String position);

    boolean existsByNameAndPosition(String name, String position);
}