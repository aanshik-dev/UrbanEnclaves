package com.RealState.Project.DTO.Admin;

import com.RealState.Project.DTO.AgentSummaryDTO;
import com.RealState.Project.DTO.RecentTransactionsDTO;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardDTO {

    private Long totalUsers;
    private Long totalAgents;
    private Long totalProperties;
    private Long activeListings;

    private Long soldListings;
    private Long rentedListings;

    private long activeInSold;
    private long activeInRent;



    private Double totalRevenue;

    private List<AgentSummaryDTO> agents;

    private List<RecentTransactionsDTO> recentTransactions;
}