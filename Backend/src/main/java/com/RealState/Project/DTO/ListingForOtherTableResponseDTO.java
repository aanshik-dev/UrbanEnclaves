package com.RealState.Project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListingForOtherTableResponseDTO {

    private Float listingPrice;
    private String listingType;
    private String city;
}
