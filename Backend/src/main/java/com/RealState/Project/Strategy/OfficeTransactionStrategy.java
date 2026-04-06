package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.OfficeRepository;
import com.RealState.Project.Repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OfficeTransactionStrategy implements TransactionAccessStrategy {

    private final OfficeRepository officeRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public List<Transaction> getTransactions(User user){

        Office office =
                officeRepository.findByUser(user).orElseThrow();

        return transactionRepository.findByAgentOffice(office);
    }

    @Override
    public boolean canAccess(Transaction transaction, User user){

        return transaction
                .getAgent()
                .getOffice()
                .getUser()
                .getId()
                .equals(user.getId());
    }
}