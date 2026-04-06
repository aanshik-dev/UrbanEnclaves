package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Property_type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyForOtherTableResponseDTO {

    private Long propertyId;
    private String houseNo;

    private String description;


    private String locality;
    private String area;
    private String city;
    private int pin;
    private float size;
    private Property_type type;
    private int BHK;

}
