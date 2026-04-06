package com.RealState.Project.DTO.Admin;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionAnalyticsDTO {

    private Long totalTransactions;

    private Long fullPayments;
    private Long advancePayments;

    private Long sellDeals;
    private Long rentDeals;

    private Long todayDeals;
    private Long weeklyDeals;
    private Long monthlyDeals;

    private Double totalAmount;
    private Double averageDealAmount;
}