package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Property;
import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListingTokenDTO {
    private Long agent_id;
    private Long pid;  // property id
    private Status status;
    private String description;
    private float price;
    private Listing_type listingType;
}
