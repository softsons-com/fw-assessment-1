package com.flywire.exercise.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.*;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EmployRequest {
    private int id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Position is required")
    private String position;

    @NotNull(message = "Hire date is required")
    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate hireDate;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private List<Integer> directReports;
}