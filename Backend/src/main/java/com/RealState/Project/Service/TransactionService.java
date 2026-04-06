package com.RealState.Project.Service;

import com.RealState.Project.DTO.TransactionDTO;
import com.RealState.Project.DTO.TransactionDecrriptionDTO;
import com.RealState.Project.DTO.TransactionRequestDTO;
import com.RealState.Project.Entity.Transaction;

import java.util.List;

public interface TransactionService {

    TransactionDecrriptionDTO createTransaction(TransactionRequestDTO request);

    public List<TransactionDTO> getTransactions();

    TransactionDecrriptionDTO getTransactionById(Long id);


}