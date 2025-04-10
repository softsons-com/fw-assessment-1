package com.flywire.exercise.domain.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployDTO {
    private Integer id;
    private String name;
    private String position;

    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate hireDate;

    private boolean active;
    private List<Integer> directReports;
}
