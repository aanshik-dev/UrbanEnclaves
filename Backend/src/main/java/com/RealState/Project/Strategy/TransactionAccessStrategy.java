package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.User;

import java.util.List;

public interface TransactionAccessStrategy {
    List<Transaction> getTransactions(User user);
    boolean canAccess(Transaction transaction, User user);
}
