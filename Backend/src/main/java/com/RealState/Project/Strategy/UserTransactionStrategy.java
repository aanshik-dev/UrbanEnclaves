package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.TransactionRepository;
import jakarta.mail.search.SearchTerm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class UserTransactionStrategy implements TransactionAccessStrategy {

    private final TransactionRepository transactionRepository;

    @Override
    public List<Transaction> getTransactions(User user){

        Set<Transaction> transactions = new HashSet<>();

        transactions.addAll(
                transactionRepository.findByBuyerWithDetails(user)
        );

        transactions.addAll(
                transactionRepository.findBySellerWithDetails(user)
        );

        return new ArrayList<>(transactions);
    }

    @Override
    public boolean canAccess(Transaction transaction, User user){

        boolean isBuyer =
                transaction.getBuyer().getId().equals(user.getId());

        boolean isSeller =
                transaction.getToken()
                        .getPid()
                        .getOwner()
                        .getId()
                        .equals(user.getId());

        return isBuyer || isSeller;
    }
}