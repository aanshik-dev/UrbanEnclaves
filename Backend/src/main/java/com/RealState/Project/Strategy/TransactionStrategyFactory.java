package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Type.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionStrategyFactory {

    private final UserTransactionStrategy userStrategy;
    private final AgentTransactionStrategy agentStrategy;
    private final OfficeTransactionStrategy officeStrategy;
    private final AdminTransactionStrategy adminStrategy;

    public TransactionAccessStrategy getStrategy(UserType type){

        return switch (type){

            case USER -> userStrategy;
            case AGENT -> agentStrategy;
            case OFFICE -> officeStrategy;
            case ADMIN -> adminStrategy;

        };
    }
}