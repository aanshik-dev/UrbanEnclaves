package com.RealState.Project.DTO;

import com.RealState.Project.Entity.Type.Transaction_Mode;
import com.RealState.Project.Entity.Type.Transactions_types;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.juli.logging.Log;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestDTO {

    private long amount;
    private Transactions_types type;
    private Transaction_Mode mode;
    private Long agentId;
    private Long buyerId;
    private Long tokenId;
}