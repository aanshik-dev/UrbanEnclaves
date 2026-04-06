package com.RealState.Project.DTO.Admin;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopAgentDTO {

    private Long agentId;
    private String agentName;
    private Long totalDeals;
    private Double totalRevenue;
}