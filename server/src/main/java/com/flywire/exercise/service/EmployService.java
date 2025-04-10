package com.flywire.exercise.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flywire.exercise.domain.dto.*;
import com.flywire.exercise.domain.model.Employ;
import com.flywire.exercise.domain.repository.EmployRepository;
import com.flywire.exercise.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployService {
    private final EmployRepository employRepository;
    private final EmployMapper employMapper;

    public List<EmployDTO> getAllEmployees() {
        return employRepository.findAll()
                .stream()
                .map(employMapper::toDto)
                .collect(Collectors.toList());
    }

    public EmployDTO getEmployeeById(Integer id) {
        Employ employee = employRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return employMapper.toDto(employee);
    }

    public List<EmployDTO> getActiveEmployees() {
        return employRepository.findByActiveTrue()
                .stream()
                .map(employMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<EmployDTO> getEmployeesByPosition(String position) {
        return employRepository.findByPosition(position)
                .stream()
                .map(employMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public EmployDTO createEmployee(EmployRequest employeeRequest) {
        Employ employ = employMapper.toEntity(employeeRequest);
        employ = employRepository.save(employ);
        return employMapper.toDto(employ);
    }

    @Transactional
    public EmployDTO updateEmployee(Integer id, EmployRequest employeeRequest) {
        Employ employ = employRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employMapper.updateEntity(employeeRequest, employ);
        employ = employRepository.save(employ);
        return employMapper.toDto(employ);
    }

    @Transactional
    public void deleteEmployee(Integer id) {
        if (!employRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employRepository.deleteById(id);
    }

    public List<EmployDTO> getDirectReports(Integer managerId) {
        Employ manager = employRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found with id: " + managerId));

        return manager.getDirectReports().stream()
                .map(reportId -> employRepository.findById(reportId)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + reportId)))
                .map(employMapper::toDto)
                .collect(Collectors.toList());
    }
}
