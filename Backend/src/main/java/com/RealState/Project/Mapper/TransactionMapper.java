package com.RealState.Project.Mapper;

import com.RealState.Project.DTO.TransactionDTO;
import com.RealState.Project.Entity.Transaction;

public class TransactionMapper {

    public static TransactionDTO toDTO(Transaction t){

        TransactionDTO dto = new TransactionDTO();

        dto.setTransactionId(t.getTid());
        dto.setAmount(t.getAmount());
        dto.setDate(t.getTransactionDate());

        // Agent
        dto.setType(t.getType());
        dto.setMode(t.getMode());
        dto.setAgentId(t.getAgent().getId());
        dto.setAgentName(
                t.getAgent()
                        .getUser()
                        .getUserProfile()
                        .getName()
        );

        // Buyer

        dto.setBuyerId(t.getBuyer().getId());
        dto.setBuyerName(
                t.getBuyer()
                        .getUserProfile()
                        .getName()
        );

        // Seller (owner)

        dto.setSellerId(
                t.getToken()
                        .getPid()
                        .getOwner()
                        .getId()
        );

        dto.setSellerName(
                t.getToken()
                        .getPid()
                        .getOwner()
                        .getUserProfile()
                        .getName()
        );

        // Listing

        dto.setPropertyId(
                t.getToken()
                        .getPid()
                        .getId()
        );

        dto.setListingPrice(
                t.getToken()
                        .getPrice()
        );

        dto.setListingType(
                t.getToken()
                        .getListingType()
                        .name()
        );

        dto.setCity(
                t.getToken()
                        .getPid()
                        .getCity()
        );

        return dto;
    }
}