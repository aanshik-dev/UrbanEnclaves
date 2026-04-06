package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Transaction_Mode;
import com.RealState.Project.Entity.Type.Transactions_types;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDecrriptionDTO {

    private Long transactionId;
    private Long amount;
    private LocalDate date;
    private Transactions_types type;
    private Transaction_Mode mode;

    // Agent
    private AgentForOtherTableResponseDTO agent;
    private UserForOtherTableResponseDTO buyer;
    private UserForOtherTableResponseDTO seller;

    // Listing
    private PropertyForOtherTableResponseDTO property;
    private ListingForOtherTableResponseDTO listing;
}
