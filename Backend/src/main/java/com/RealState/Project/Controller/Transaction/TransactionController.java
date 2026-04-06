package com.RealState.Project.Controller.Transaction;


import com.RealState.Project.DTO.TransactionDTO;
import com.RealState.Project.DTO.TransactionDecrriptionDTO;
import com.RealState.Project.DTO.TransactionRequestDTO;
import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;


    // POST Transaction
    @PostMapping
    public TransactionDecrriptionDTO createTransaction(@RequestBody TransactionRequestDTO request){

        return transactionService.createTransaction(request);
    }

    // GET All Transactions
    @GetMapping("/me/transactions")
    public List<TransactionDTO> getTransactions(){

        return transactionService.getTransactions();
    }


    // GET Transaction by Id
    @GetMapping("/{transactionId}")
    public TransactionDecrriptionDTO getTransactionById(@PathVariable Long transactionId){

        return transactionService.getTransactionById(transactionId);
    }


}