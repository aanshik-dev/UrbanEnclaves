package com.RealState.Project.Service.Impl;

import com.RealState.Project.DTO.*;
import com.RealState.Project.Entity.*;
import com.RealState.Project.Entity.Type.UserType;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.OfficeRepository;
import com.RealState.Project.Repository.PropertyRepository;
import com.RealState.Project.Repository.UserRepository;
import com.RealState.Project.Service.PropertyService;
import com.RealState.Project.Strategy.PropertyAccessStrategy;
import com.RealState.Project.Strategy.PropertyStrategyFactory;
import com.RealState.Project.Utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    public final PropertyRepository propertyRepository;
    public final OfficeRepository officeRepository;
    public final UserRepository userRepository;
    private final SecurityUtil securityUtil;
    private final AgentRepository agentRepository;
    private final PropertyStrategyFactory propertyStrategyFactory;

    @Override
    public PropertyResponseDTO addProperty(PropertyRequestDTO request){

        // get logged-in user
        User currentUser = securityUtil.getCurrentUser();

        // get office from frontend selected id
        Office office = officeRepository.findById(request.getOfficeId())
                .orElseThrow(() -> new RuntimeException("Office not found"));

        // build property
        Property property = Property.builder()
                .type(request.getType())
                .houseNo(request.getHouseNo())
                .locality(request.getLocality())
                .BHK(request.getBHK())
                .city(request.getCity())
                .area(request.getArea())
                .size(request.getSize())
                .year_built(request.getYear_built())
                .pin(request.getPin())
                .office(office)
                .description(request.getDesctiption())
                .owner(currentUser)
                .build();

        Property saved = propertyRepository.save(property);

        // return response
        return convertToDTO(saved);
    }


    @Override
    public PropertyResponseDTO updateProperty(Long pid, PropertyRequestDTO request) {

        // Get property
        Property property = propertyRepository.findById(pid)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Get logged-in user
        User currentUser = securityUtil.getCurrentUser();

        // Check ownership
        if (!property.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not authorized to update this property");
        }

        // Fetch office (optional if allowed to change office)
        Office office = officeRepository.findById(request.getOfficeId())
                .orElseThrow(() -> new RuntimeException("Office not found"));

        // Update fields
        property.setType(request.getType());
        property.setHouseNo(request.getHouseNo());
        property.setLocality(request.getLocality());
        property.setBHK(request.getBHK());
        property.setCity(request.getCity());
        property.setArea(request.getArea());
        property.setSize(request.getSize());
        property.setYear_built(request.getYear_built());
        property.setPin(request.getPin());
        property.setOffice(office);

        Property saved = propertyRepository.save(property);

        // Return response DTO
        return convertToDTO(saved);
    }

    @Override
    public void deletePropertyByID(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // get logged-in user
        User currentUser = securityUtil.getCurrentUser();

        // check ownership
        if (!property.getOwner().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not authorized to delete this property");
        }

        propertyRepository.delete(property);
    }

    // get property corresponding to ID
    @Override
    public PropertyResponseDTO getPropertyById(Long id){

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        User user = property.getOwner();
        Office office = property.getOffice();

        return convertToDTO(property);
    }

    @Override
    public List<PropertyResponseDTO> getMyProperties(){

        User user = securityUtil.getCurrentUser();

        UserType type = user.getUserProfile().getUserType();

        PropertyAccessStrategy strategy =
                propertyStrategyFactory.getStrategy(type);

        return strategy.getProperties(user)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


    private PropertyResponseDTO convertToDTO(Property property){

        // Owner DTO
        User ownerUser = property.getOwner();
        UserProfile ownerProfile = ownerUser.getUserProfile();

        UserForOtherTableResponseDTO ownerDTO =
                new UserForOtherTableResponseDTO(
                        ownerProfile.getName(),
                        String.valueOf(ownerProfile.getPhone()),
                        ownerProfile.getProfileURL()
                );

        // Office DTO
        Office office = property.getOffice();

        OfficeForOtherTableResponseDTO officeDTO =
                new OfficeForOtherTableResponseDTO(
                        office.getOfficeName(),
                        office.getOfficeNumber(),
                        office.getLocation()
                );


        return PropertyResponseDTO.builder()
                .id(property.getId())
                .type(property.getType())
                .houseNo(property.getHouseNo())
                .locality(property.getLocality())
                .BHK(property.getBHK())
                .city(property.getCity())
                .area(property.getArea())
                .size(property.getSize())
                .year_built(property.getYear_built())
                .pin(property.getPin())
                .owner(ownerDTO)
                .office(officeDTO)
                .images(List.of()) // later add image mapping
                .build();
    }
}
