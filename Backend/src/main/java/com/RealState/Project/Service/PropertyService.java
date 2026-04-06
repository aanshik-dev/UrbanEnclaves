package com.RealState.Project.Service;

import com.RealState.Project.DTO.PropertyRequestDTO;
import com.RealState.Project.DTO.PropertyResponseDTO;

import java.util.List;

public interface PropertyService {
    PropertyResponseDTO addProperty(PropertyRequestDTO request) ;

    PropertyResponseDTO updateProperty(Long pid, PropertyRequestDTO request);

    void deletePropertyByID(Long id);

    // get property corresponding to ID
    PropertyResponseDTO getPropertyById(Long id);

    List<PropertyResponseDTO> getMyProperties();
}
