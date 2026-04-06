package com.RealState.Project.DTO;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PropertyDTO {

    private Long id;

    private String city;

    private String locality;

    private float price;

}