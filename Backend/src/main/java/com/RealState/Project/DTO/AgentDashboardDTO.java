package com.RealState.Project.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AgentDashboardDTO {

    // listings
    private Long totalListings;
    private Long activeListings;
    private Long soldListings;

    // deals
    private Long totalDeals;
    private Long dealsThisMonth;

    // revenue
    private Double totalRevenue;
    private Double monthlyRevenue;

    // commission
    private Double totalCommission;
    private Double monthlyCommission;

    // performance
    private Double rating;
    private Double performanceScore;

    // averages
    private Double avgDealValue;
    private Double conversionRate;

}