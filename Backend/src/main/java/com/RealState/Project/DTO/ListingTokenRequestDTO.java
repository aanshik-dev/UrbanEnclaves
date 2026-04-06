package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Listing_type;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListingTokenRequestDTO {

    private Long propertyId;
    private Listing_type listingType;
    private float price;
    private String description;
}