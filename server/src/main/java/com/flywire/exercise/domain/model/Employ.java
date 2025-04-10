package com.flywire.exercise.domain.model;

import javax.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String position;

    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @Column(nullable = false)
    private boolean active;

    @ElementCollection
    @CollectionTable(name = "direct_reports", joinColumns = @JoinColumn(name = "manager_id"))
    @Column(name = "employee_id")
    private List<Integer> directReports;
}