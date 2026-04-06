package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AdminTransactionStrategy implements TransactionAccessStrategy {

    private final TransactionRepository transactionRepository;

    @Override
    public List<Transaction> getTransactions(User user) {

        return transactionRepository.findAllWithDetails();
    }

    @Override
    public boolean canAccess(Transaction transaction, User user){
        return true;
    }
}