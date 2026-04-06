package com.RealState.Project.Controller.ListingToken;


import com.RealState.Project.DTO.ListingTokenDTO;
import com.RealState.Project.DTO.ListingTokenRequestDTO;
import com.RealState.Project.DTO.ListingTokenResponseDTO;
import com.RealState.Project.DTO.PropertyResponseDTO;
import com.RealState.Project.Entity.ListingToken;
import com.RealState.Project.Service.ListingPropertyServices;
import com.RealState.Project.Service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingTokenController {
    private final ListingPropertyServices listingPropertyServices;

    @GetMapping
    public ResponseEntity<List<ListingTokenResponseDTO>> getAllListingProperties(){

        return ResponseEntity.ok(
                listingPropertyServices.getAllListedProperties()
        );
    }

    @PostMapping
    public ResponseEntity<ListingTokenResponseDTO> createListing(
            @RequestBody ListingTokenRequestDTO request){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(listingPropertyServices.createListingToken(request));
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<ListingTokenResponseDTO> updateListedProperties(
            @PathVariable Long listingId,
            @RequestBody ListingTokenRequestDTO request){

        return ResponseEntity.ok(
                listingPropertyServices.updateListingPropertyByID(listingId, request)
        );
    }

    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> deleteListingProperties(
            @PathVariable Long listingId){

        listingPropertyServices.deleteListingPropertyById(listingId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/listings")
    public ResponseEntity<List<ListingTokenResponseDTO>> getMyListings(){

        return ResponseEntity.ok(
                listingPropertyServices.getMyListings()
        );
    }


}
