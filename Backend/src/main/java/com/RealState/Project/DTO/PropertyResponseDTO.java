package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Property_type;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyResponseDTO {

    private Long id;
    private Property_type type;
    private String houseNo;
    private String locality;
    private int BHK;
    private float size;
    private String city;
    private String area;
    private int year_built;
    private int pin;
    private Property_type propertyType;

    private UserForOtherTableResponseDTO owner;

    private OfficeForOtherTableResponseDTO office;

    private List<ImageDTO> images;

}