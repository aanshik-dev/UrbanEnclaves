package com.RealState.Project.DTO.Admin;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RevenueAnalyticsDTO {

    private Double totalRevenue;
    private Double monthlyRevenue;
    private Double weeklyRevenue;
    private Double revenueFromSell;
    private Double revenueFromRent;
}


