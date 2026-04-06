package com.RealState.Project.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserForOtherTableResponseDTO {

    private String name;
    private String phone;
    private String profileUrl;


}
