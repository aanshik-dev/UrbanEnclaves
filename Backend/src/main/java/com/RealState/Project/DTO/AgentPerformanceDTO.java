package com.RealState.Project.DTO;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AgentPerformanceDTO {

    private Long agentId;
    private String agentName;
    private String agentStatus;
    private String profileUrl;
    private String phone;
    private String email;
    private String experience;
    private String commissionRate;

    private int total_deals;
    private int activeDeals;
    private int totalSales;

    private float score;
    private float user_rating;

    private int deals_left;

}