package com.flywire.exercise.controller;

import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.flywire.exercise.domain.dto.EmployDTO;
import com.flywire.exercise.domain.dto.EmployRequest;
import com.flywire.exercise.service.EmployService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployController {
    private final EmployService employService;

    @GetMapping
    public ResponseEntity<List<EmployDTO>> getAllEmployees() {
        return ResponseEntity.ok(employService.getAllEmployees());
    }

    @GetMapping("/active")
    public ResponseEntity<List<EmployDTO>> getActiveEmployees() {
        return ResponseEntity.ok(employService.getActiveEmployees());
    }

    @GetMapping("/position/{position}")
    public ResponseEntity<List<EmployDTO>> getEmployeesByPosition(@PathVariable String position) {
        return ResponseEntity.ok(employService.getEmployeesByPosition(position));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployDTO> getEmployeeById(@PathVariable Integer id) {
        return ResponseEntity.ok(employService.getEmployeeById(id));
    }

    @GetMapping("/{managerId}/reports")
    public ResponseEntity<List<EmployDTO>> getDirectReports(@PathVariable Integer managerId) {
        return ResponseEntity.ok(employService.getDirectReports(managerId));
    }

    @PostMapping
    public ResponseEntity<EmployDTO> createEmployee(@Valid @RequestBody EmployRequest employeeRequest) {
        return new ResponseEntity<>(employService.createEmployee(employeeRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployDTO> updateEmployee(
            @PathVariable Integer id,
            @Valid @RequestBody EmployRequest employeeRequest) {
        return ResponseEntity.ok(employService.updateEmployee(id, employeeRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id) {
        employService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}