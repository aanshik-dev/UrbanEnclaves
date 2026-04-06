package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Transaction_Mode;
import com.RealState.Project.Entity.Type.Transactions_types;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecentTransactionsDTO {

    private Long transactionId;
    private Long amount;
    private LocalDate date;

    private String buyerName;
    private String sellerName;

    private String propertyCity;

    private Transactions_types type;
    private Transaction_Mode mode;
}