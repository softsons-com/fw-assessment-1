# Spring Boot 3 REST API for Employee Management

I'll create a complete Spring Boot 3 application for managing employee data with REST endpoints, exception handling, and comprehensive testing.

## Project Structure

```
src/
├── main/
│   ├── java/com/example/employeemanagement/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── EmployeeManagementApplication.java
│   └── resources/
│       ├── application.properties
│       └── employees.json
└── test/
    └── java/com/example/employeemanagement/
        ├── controller/
        ├── repository/
        ├── service/
        └── integration/
```

## Implementation

### 1. Dependencies (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>employee-management</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>employee-management</name>
    <description>Employee Management REST API</description>

    <properties>
        <java.version>17</java.version>
        <mapstruct.version>1.5.5.Final</mapstruct.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- Database & Persistence -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JSON Processing -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.datatype</groupId>
            <artifactId>jackson-datatype-jsr310</artifactId>
        </dependency>

        <!-- Mapping -->
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>junit-jupiter</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.mapstruct</groupId>
                            <artifactId>mapstruct-processor</artifactId>
                            <version>${mapstruct.version}</version>
                        </path>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>1.18.30</version>
                        </path>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok-mapstruct-binding</artifactId>
                            <version>0.2.0</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2. Employee Model

```java
package com.example.employeemanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private List<Long> directReports;
}
```

### 3. DTOs

**EmployeeDTO.java**

```java
package com.example.employeemanagement.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long id;
    private String name;
    private String position;

    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate hireDate;

    private boolean active;
    private List<Long> directReports;
}
```

**EmployeeRequest.java**

```java
package com.example.employeemanagement.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EmployeeRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Position is required")
    private String position;

    @NotNull(message = "Hire date is required")
    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate hireDate;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private List<Long> directReports;
}
```

### 4. Mapper

```java
package com.example.employeemanagement.dto;

import com.example.employeemanagement.model.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);

    EmployeeDTO toDto(Employee employee);

    Employee toEntity(EmployeeRequest employeeRequest);

    void updateEntity(EmployeeRequest employeeRequest, @MappingTarget Employee employee);
}
```

### 5. Repository

```java
package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByActiveTrue();
    List<Employee> findByPosition(String position);
    boolean existsByNameAndPosition(String name, String position);
}
```

### 6. Service

**EmployeeService.java**

```java
package com.example.employeemanagement.service;

import com.example.employeemanagement.dto.EmployeeDTO;
import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toDto)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return employeeMapper.toDto(employee);
    }

    public List<EmployeeDTO> getActiveEmployees() {
        return employeeRepository.findByActiveTrue()
                .stream()
                .map(employeeMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<EmployeeDTO> getEmployeesByPosition(String position) {
        return employeeRepository.findByPosition(position)
                .stream()
                .map(employeeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public EmployeeDTO createEmployee(EmployeeRequest employeeRequest) {
        Employee employee = employeeMapper.toEntity(employeeRequest);
        employee = employeeRepository.save(employee);
        return employeeMapper.toDto(employee);
    }

    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeRequest employeeRequest) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeMapper.updateEntity(employeeRequest, employee);
        employee = employeeRepository.save(employee);
        return employeeMapper.toDto(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    public List<EmployeeDTO> getDirectReports(Long managerId) {
        Employee manager = employeeRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found with id: " + managerId));

        return manager.getDirectReports().stream()
                .map(reportId -> employeeRepository.findById(reportId)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + reportId)))
                .map(employeeMapper::toDto)
                .collect(Collectors.toList());
    }
}
```

### 7. Controller

```java
package com.example.employeemanagement.controller;

import com.example.employeemanagement.dto.EmployeeDTO;
import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/active")
    public ResponseEntity<List<EmployeeDTO>> getActiveEmployees() {
        return ResponseEntity.ok(employeeService.getActiveEmployees());
    }

    @GetMapping("/position/{position}")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByPosition(@PathVariable String position) {
        return ResponseEntity.ok(employeeService.getEmployeesByPosition(position));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @GetMapping("/{managerId}/reports")
    public ResponseEntity<List<EmployeeDTO>> getDirectReports(@PathVariable Long managerId) {
        return ResponseEntity.ok(employeeService.getDirectReports(managerId));
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        return new ResponseEntity<>(employeeService.createEmployee(employeeRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest employeeRequest) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 8. Exception Handling

**ErrorResponse.java**

```java
package com.example.employeemanagement.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
```

**GlobalExceptionHandler.java**

```java
package com.example.employeemanagement.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse(ex.getMessage());

        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                errorMessage,
                request.getRequestURI());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(
            ConstraintViolationException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

**ResourceNotFoundException.java**

```java
package com.example.employeemanagement.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

### 9. Data Initialization

```java
package com.example.employeemanagement.config;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {
    private final EmployeeRepository employeeRepository;
    private final ObjectMapper objectMapper;

    @PostConstruct
    public void init() throws IOException {
        if (employeeRepository.count() == 0) {
            ClassPathResource resource = new ClassPathResource("employees.json");
            List<EmployeeData> employeeDataList = objectMapper.readValue(
                    resource.getInputStream(),
                    new TypeReference<List<EmployeeData>>() {});

            List<Employee> employees = employeeDataList.stream()
                    .map(this::mapToEmployee)
                    .toList();

            employeeRepository.saveAll(employees);
        }
    }

    private Employee mapToEmployee(EmployeeData data) {
        Employee employee = new Employee();
        employee.setId(data.id());
        employee.setName(data.name());
        employee.setPosition(data.position());
        employee.setHireDate(LocalDate.parse(data.hireDate(), DateTimeFormatter.ofPattern("MM/dd/yyyy")));
        employee.setActive(data.active());
        employee.setDirectReports(data.directReports());
        return employee;
    }

    private record EmployeeData(
            Long id,
            String name,
            String position,
            String hireDate,
            boolean active,
            List<Long> directReports
    ) {}
}
```

### 10. Application Properties

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:h2:mem:employeedb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true

# Jackson
spring.jackson.date-format=MM/dd/yyyy
spring.jackson.time-zone=UTC
```

### 11. Unit Tests

**EmployeeServiceTest.java**

```java
package com.example.employeemanagement.service;

import com.example.employeemanagement.dto.EmployeeDTO;
import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee employee;
    private EmployeeDTO employeeDTO;
    private EmployeeRequest employeeRequest;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("John Doe");
        employee.setPosition("Developer");
        employee.setHireDate(LocalDate.now());
        employee.setActive(true);

        employeeDTO = new EmployeeDTO();
        employeeDTO.setId(1L);
        employeeDTO.setName("John Doe");
        employeeDTO.setPosition("Developer");
        employeeDTO.setHireDate(LocalDate.now());
        employeeDTO.setActive(true);

        employeeRequest = new EmployeeRequest();
        employeeRequest.setName("John Doe");
        employeeRequest.setPosition("Developer");
        employeeRequest.setHireDate(LocalDate.now());
        employeeRequest.setActive(true);
    }

    @Test
    void getAllEmployees_ShouldReturnListOfEmployees() {
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(employee));
        when(employeeMapper.toDto(any(Employee.class))).thenReturn(employeeDTO);

        List<EmployeeDTO> result = employeeService.getAllEmployees();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(employeeDTO, result.get(0));
    }

    @Test
    void getEmployeeById_ShouldReturnEmployee() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeMapper.toDto(any(Employee.class))).thenReturn(employeeDTO);

        EmployeeDTO result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals(employeeDTO, result);
    }

    @Test
    void getEmployeeById_ShouldThrowExceptionWhenNotFound() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> employeeService.getEmployeeById(1L));
    }

    @Test
    void createEmployee_ShouldReturnCreatedEmployee() {
        when(employeeMapper.toEntity(any(EmployeeRequest.class))).thenReturn(employee);
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);
        when(employeeMapper.toDto(any(Employee.class))).thenReturn(employeeDTO);

        EmployeeDTO result = employeeService.createEmployee(employeeRequest);

        assertNotNull(result);
        assertEquals(employeeDTO, result);
    }

    @Test
    void updateEmployee_ShouldReturnUpdatedEmployee() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);
        when(employeeMapper.toDto(any(Employee.class))).thenReturn(employeeDTO);

        EmployeeDTO result = employeeService.updateEmployee(1L, employeeRequest);

        assertNotNull(result);
        assertEquals(employeeDTO, result);
    }

    @Test
    void deleteEmployee_ShouldDeleteEmployee() {
        when(employeeRepository.existsById(1L)).thenReturn(true);

        employeeService.deleteEmployee(1L);

        verify(employeeRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteEmployee_ShouldThrowExceptionWhenNotFound() {
        when(employeeRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> employeeService.deleteEmployee(1L));
    }
}
```

### 12. Integration Tests

**EmployeeControllerIntegrationTest.java**

```java
package com.example.employeemanagement.integration;

import com.example.employeemanagement.dto.EmployeeDTO;
import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class EmployeeControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        employeeRepository.deleteAll();
    }

    @Test
    void givenEmployeeObject_whenCreateEmployee_thenReturnSavedEmployee() throws Exception {
        // given
        EmployeeRequest employeeRequest = new EmployeeRequest();
        employeeRequest.setName("John Doe");
        employeeRequest.setPosition("Developer");
        employeeRequest.setHireDate(LocalDate.now());
        employeeRequest.setActive(true);

        // when
        ResultActions response = mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeRequest)));

        // then
        response.andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name", is(employeeRequest.getName())))
                .andExpect(jsonPath("$.position", is(employeeRequest.getPosition())));
    }

    @Test
    void givenListOfEmployees_whenGetAllEmployees_thenReturnEmployeesList() throws Exception {
        // given
        List<Employee> employees = Arrays.asList(
                createTestEmployee("John Doe", "Developer"),
                createTestEmployee("Jane Smith", "Manager")
        );
        employeeRepository.saveAll(employees);

        // when
        ResultActions response = mockMvc.perform(get("/api/employees"));

        // then
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()", is(employees.size())));
    }

    @Test
    void givenEmployeeId_whenGetEmployeeById_thenReturnEmployeeObject() throws Exception {
        // given
        Employee savedEmployee = employeeRepository.save(createTestEmployee("John Doe", "Developer"));

        // when
        ResultActions response = mockMvc.perform(get("/api/employees/{id}", savedEmployee.getId()));

        // then
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.name", is(savedEmployee.getName())))
                .andExpect(jsonPath("$.position", is(savedEmployee.getPosition())));
    }

    @Test
    void givenInvalidEmployeeId_whenGetEmployeeById_thenReturn404() throws Exception {
        // given
        long invalidId = 999L;

        // when
        ResultActions response = mockMvc.perform(get("/api/employees/{id}", invalidId));

        // then
        response.andExpect(status().isNotFound())
                .andDo(print());
    }

    @Test
    void givenUpdatedEmployee_whenUpdateEmployee_thenReturnUpdatedEmployee() throws Exception {
        // given
        Employee savedEmployee = employeeRepository.save(createTestEmployee("John Doe", "Developer"));

        EmployeeRequest updatedRequest = new EmployeeRequest();
        updatedRequest.setName("John Updated");
        updatedRequest.setPosition("Senior Developer");
        updatedRequest.setHireDate(LocalDate.now());
        updatedRequest.setActive(true);

        // when
        ResultActions response = mockMvc.perform(put("/api/employees/{id}", savedEmployee.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedRequest)));

        // then
        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.name", is(updatedRequest.getName())))
                .andExpect(jsonPath("$.position", is(updatedRequest.getPosition())));
    }

    @Test
    void givenEmployeeId_whenDeleteEmployee_thenReturn200() throws Exception {
        // given
        Employee savedEmployee = employeeRepository.save(createTestEmployee("John Doe", "Developer"));

        // when
        ResultActions response = mockMvc.perform(delete("/api/employees/{id}", savedEmployee.getId()));

        // then
        response.andExpect(status().isNoContent())
                .andDo(print());
    }

    private Employee createTestEmployee(String name, String position) {
        Employee employee = new Employee();
        employee.setName(name);
        employee.setPosition(position);
        employee.setHireDate(LocalDate.now());
        employee.setActive(true);
        return employee;
    }
}
```

### 13. Main Application Class

```java
package com.example.employeemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);
    }
}
```

## How to Run and Test

1. Build the application:

   ```bash
   mvn clean install
   ```

2. Run the application:

   ```bash
   mvn spring-boot:run
   ```

3. Access the API:

   - Base URL: `http://localhost:8080/api/employees`
   - H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:employeedb`)

4. Example API Calls:

   - GET all employees: `GET /api/employees`
   - GET employee by ID: `GET /api/employees/1`
   - POST create employee:
     ```json
     POST /api/employees
     {
       "name": "New Employee",
       "position": "Tester",
       "hireDate": "01/01/2023",
       "active": true
     }
     ```
   - PUT update employee: `PUT /api/employees/1` with updated JSON
   - DELETE employee: `DELETE /api/employees/1`

5. Run tests:
   ```bash
   mvn test
   ```

This complete Spring Boot 3 application provides a RESTful API for employee management with:

- CRUD operations
- Validation
- Global exception handling
- Unit and integration tests
- H2 in-memory database with initial data loading
- Proper DTO mapping
- Comprehensive error responses
