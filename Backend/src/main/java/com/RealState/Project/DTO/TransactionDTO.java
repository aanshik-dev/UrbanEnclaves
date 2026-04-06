package com.RealState.Project.DTO;


import com.RealState.Project.Entity.Type.Transaction_Mode;
import com.RealState.Project.Entity.Type.Transactions_types;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDTO {

    private Long transactionId;
    private Long amount;
    private LocalDate date;
    private Transactions_types type;
    private Transaction_Mode mode;

    // Agent
    private Long agentId;
    private String agentName;

    // Buyer
    private Long buyerId;
    private String buyerName;

    // Seller
    private Long sellerId;
    private String sellerName;

    // Listing
    private Long propertyId;
    private Float listingPrice;
    private String listingType;
    private String city;
}