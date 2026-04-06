package com.RealState.Project.DTO;


import com.RealState.Project.Entity.Type.Status;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListingDTO {

    private Integer id;

    private float price;

    private Status status;

}