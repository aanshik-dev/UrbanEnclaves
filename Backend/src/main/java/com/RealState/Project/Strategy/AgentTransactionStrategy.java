package com.RealState.Project.Strategy;


import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Exception.AgentNotFoundException;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@RequiredArgsConstructor
public class AgentTransactionStrategy implements TransactionAccessStrategy {

    private final AgentRepository agentRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public List<Transaction> getTransactions(User user){

        Agent agent =
                agentRepository.findByUser(user).orElseThrow(()->new AgentNotFoundException("Agent not found"));

        return transactionRepository.findByAgent(agent);
    }

    @Override
    public boolean canAccess(Transaction transaction, User user){

        return transaction
                .getAgent()
                .getUser()
                .getId()
                .equals(user.getId());
    }
}