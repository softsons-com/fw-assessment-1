package com.flywire.exercise.domain.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.flywire.exercise.domain.model.Employ;

@Mapper(componentModel = "spring")
public interface EmployMapper {
    EmployMapper INSTANCE = Mappers.getMapper(EmployMapper.class);

    EmployDTO toDto(Employ employee);

    @Mapping(source = "id", target = "id")
    Employ toEntity(EmployRequest employRequest);

    void updateEntity(EmployRequest employRequest, @MappingTarget Employ employ);
}