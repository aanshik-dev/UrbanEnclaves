package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Property_type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyRequestDTO {
    private Property_type type;
    private String desctiption;
    private String houseNo;
    private String locality;
    private int BHK;
    private float size;
    private String city;
    private String area;
    private int year_built;
    private int pin;

    private Long officeId;
}
