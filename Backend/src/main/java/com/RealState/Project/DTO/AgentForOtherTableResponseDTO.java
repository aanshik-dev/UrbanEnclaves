package com.RealState.Project.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AgentForOtherTableResponseDTO {

    private String name;
    private String phone;
    private String profileUrl;
    private String userRating;
}
