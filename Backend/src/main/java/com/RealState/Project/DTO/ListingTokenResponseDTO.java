package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Status;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListingTokenResponseDTO {

    private Integer tokenId;
    private LocalDate listingDate;
    private Listing_type listingType;
    private float price;
    private String description;
    private Status status;

    private Long propertyId;
    private Long agentId;
}