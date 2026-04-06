package com.RealState.Project.Service.Impl;


import com.RealState.Project.DTO.ListingTokenRequestDTO;
import com.RealState.Project.DTO.ListingTokenResponseDTO;
import com.RealState.Project.Entity.*;
import com.RealState.Project.Entity.Type.Status;
import com.RealState.Project.Entity.Type.UserType;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.ListingTokenRepository;
import com.RealState.Project.Repository.PropertyRepository;
import com.RealState.Project.Service.ListingPropertyServices;
import com.RealState.Project.Strategy.ListingAccessStrategy;
import com.RealState.Project.Strategy.ListingStrategyFactory;
import com.RealState.Project.Utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ListingPropertyServiceImpl implements ListingPropertyServices {
    private final ListingTokenRepository listingTokenRepository;
    private final AgentRepository agentRepository;
    private final PropertyRepository propertyRepository;
    private final SecurityUtil securityUtil;
    private  final ListingStrategyFactory listingStrategyFactory;

    @Override
    public List<ListingTokenResponseDTO> getAllListedProperties() {

        return listingTokenRepository.findAll()
                .stream()
                .map(token -> ListingTokenResponseDTO.builder()
                        .tokenId(token.getToken_id())
                        .listingDate(token.getListingDate())
                        .listingType(token.getListingType())
                        .price(token.getPrice())
                        .description(token.getDescription())
                        .status(token.getStatus())
                        .propertyId(token.getPid().getId())
                        .agentId(
                                token.getAgent() != null ?
                                        token.getAgent().getId() : null
                        )
                        .build())
                .toList();
    }


    @Override
    public ListingTokenResponseDTO createListingToken(
            ListingTokenRequestDTO request){

        // Get logged in user
        User currentUser = securityUtil.getCurrentUser();

        // Get property
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Check ownership
        if (!property.getOwner().getId().equals(currentUser.getId())){
            throw new RuntimeException("Only owner can list property");
        }

        // Get property office
        Office office = property.getOffice();

        // Get least busy agent
        Agent agent = agentRepository.findLeastBusyAgent(office)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No agents available"));

        // Create listing
        ListingToken listing = ListingToken.builder()
                .listingType(request.getListingType())
                .price(request.getPrice())
                .description(request.getDescription())
                .status(Status.ACTIVE)
                .pid(property)
                .agent(agent)
                .build();

        ListingToken saved = listingTokenRepository.save(listing);

        return ListingTokenResponseDTO.builder()
                .tokenId(saved.getToken_id())
                .listingDate(saved.getListingDate())
                .listingType(saved.getListingType())
                .price(saved.getPrice())
                .description(saved.getDescription())
                .status(saved.getStatus())
                .propertyId(saved.getPid().getId())
                .agentId(saved.getAgent().getId())
                .build();
    }


    @Override
    public ListingTokenResponseDTO getListedPropertyById(Long listingId){

        ListingToken listing = listingTokenRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        return ListingTokenResponseDTO.builder()
                .tokenId(listing.getToken_id())
                .listingDate(listing.getListingDate())
                .listingType(listing.getListingType())
                .price(listing.getPrice())
                .description(listing.getDescription())
                .status(listing.getStatus())
                .propertyId(listing.getPid().getId())
                .agentId(
                        listing.getAgent()!=null ?
                                listing.getAgent().getId() : null
                )
                .build();
    }

    @Override
    public ListingTokenResponseDTO updateListingPropertyByID(
            Long listingId,
            ListingTokenRequestDTO request){

        ListingToken listing = listingTokenRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // get logged in user
        User currentUser = securityUtil.getCurrentUser();

        // property owner
        User owner = listing.getPid().getOwner();

        // authorization check
        if(!owner.getId().equals(currentUser.getId())){
            throw new RuntimeException("You are not authorized to update this listing");
        }

        // update fields
        listing.setListingType(request.getListingType());
        listing.setPrice(request.getPrice());
        listing.setDescription(request.getDescription());

        ListingToken saved = listingTokenRepository.save(listing);

        return ListingTokenResponseDTO.builder()
                .tokenId(saved.getToken_id())
                .listingDate(saved.getListingDate())
                .listingType(saved.getListingType())
                .price(saved.getPrice())
                .description(saved.getDescription())
                .status(saved.getStatus())
                .propertyId(saved.getPid().getId())
                .agentId(
                        saved.getAgent()!=null ?
                                saved.getAgent().getId() : null
                )
                .build();
    }

    @Override
    public void deleteListingPropertyById(Long listingId){

        ListingToken listing = listingTokenRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));


        User currentUser = securityUtil.getCurrentUser();
        User owner = listing.getPid().getOwner();


        if(!owner.getId().equals(currentUser.getId())){
            throw new RuntimeException("You are not authorized to delete this listing");
        }

        listingTokenRepository.delete(listing);
    }

    @Override
    public List<ListingTokenResponseDTO> getMyListings(){

        User user = securityUtil.getCurrentUser();

        UserType type = user.getUserProfile().getUserType();

        ListingAccessStrategy strategy =
                listingStrategyFactory.getStrategy(type);

        List<ListingToken> listings =
                strategy.getListings(user);

        return listings.stream()
                .map(this::convertToDTO)
                .toList();
    }


    private ListingTokenResponseDTO convertToDTO(ListingToken listing){

        return ListingTokenResponseDTO.builder()
                .tokenId(listing.getToken_id())
                .listingDate(listing.getListingDate())
                .listingType(listing.getListingType())
                .price(listing.getPrice())
                .description(listing.getDescription())
                .status(listing.getStatus())
                .propertyId(listing.getPid().getId())
                .agentId(
                        listing.getAgent() != null ?
                                listing.getAgent().getId() : null
                )
                .build();
    }
}
