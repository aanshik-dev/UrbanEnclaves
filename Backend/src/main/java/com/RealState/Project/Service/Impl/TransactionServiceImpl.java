package com.RealState.Project.Service.Impl;

import com.RealState.Project.DTO.AgentForOtherTableResponseDTO;
import com.RealState.Project.DTO.TransactionDTO;
import com.RealState.Project.DTO.*;
import com.RealState.Project.DTO.TransactionRequestDTO;
import com.RealState.Project.Entity.*;
import com.RealState.Project.Mapper.TransactionMapper;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.ListingTokenRepository;
import com.RealState.Project.Repository.TransactionRepository;
import com.RealState.Project.Repository.UserRepository;
import com.RealState.Project.Service.TransactionService;
import com.RealState.Project.Strategy.TransactionAccessStrategy;
import com.RealState.Project.Strategy.TransactionStrategyFactory;
import com.RealState.Project.Utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final AgentRepository agentRepository;
    private final UserRepository userRepository;
    private final ListingTokenRepository listingTokenRepository;
    public final SecurityUtil securityUtil;
    private final TransactionStrategyFactory strategyFactory;

    @Override
    public TransactionDecrriptionDTO createTransaction(TransactionRequestDTO request) {

        Agent agent = agentRepository.findById(request.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        User buyer = userRepository.findById(request.getBuyerId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ListingToken token = listingTokenRepository.findById(request.getTokenId())
                .orElseThrow(() -> new RuntimeException("Token not found"));

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .type(request.getType())
                .mode(request.getMode())
                .agent(agent)
                .buyer(buyer)
                .token(token)
                .build();

        return convertToDTO(transactionRepository.save(transaction));
    }

    @Override
    public List<TransactionDTO> getTransactions() {
        User user = securityUtil.getCurrentUser();

        return strategyFactory
                .getStrategy(user.getUserProfile().getUserType())
                .getTransactions(user)
                .stream()
                .map(TransactionMapper::toDTO)
                .toList();
    }


    @Override
    public TransactionDecrriptionDTO getTransactionById(Long id) {

        User user = securityUtil.getCurrentUser();

        Transaction transaction =
                transactionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Transaction not found"));

        TransactionAccessStrategy strategy =
                strategyFactory.getStrategy(
                        user.getUserProfile().getUserType()
                );

        if(!strategy.canAccess(transaction,user)){

            throw new RuntimeException("Access Denied");
        }

        return convertToDTO(transaction);
    }


    public static TransactionDecrriptionDTO convertToDTO(Transaction t){

        // ---------- Agent ----------
        AgentForOtherTableResponseDTO agentDTO =
                new AgentForOtherTableResponseDTO(
                        t.getAgent().getUser().getUserProfile().getName(),
                        String.valueOf(
                                t.getAgent().getUser().getUserProfile().getPhone()
                        ),
                        t.getAgent().getUser().getUserProfile().getProfileURL(),
                        "4.5" // later from performance table
                );


        // ---------- Buyer ----------
        UserForOtherTableResponseDTO buyerDTO =
                new UserForOtherTableResponseDTO(
                        t.getBuyer().getUserProfile().getName(),
                        String.valueOf(t.getBuyer().getUserProfile().getPhone()),
                        t.getBuyer().getUserProfile().getProfileURL()
                );


        // ---------- Seller ----------
        User owner = t.getToken().getPid().getOwner();

        UserForOtherTableResponseDTO sellerDTO =
                new UserForOtherTableResponseDTO(
                        owner.getUserProfile().getName(),
                        String.valueOf(owner.getUserProfile().getPhone()),
                        owner.getUserProfile().getProfileURL()
                );


        // ---------- Property ----------
        Property property = t.getToken().getPid();

        PropertyForOtherTableResponseDTO propertyDTO =
                new PropertyForOtherTableResponseDTO();

        propertyDTO.setPropertyId(property.getId());
        propertyDTO.setHouseNo(property.getHouseNo());
        propertyDTO.setLocality(property.getLocality());
        propertyDTO.setArea(property.getArea());
        propertyDTO.setCity(property.getCity());
        propertyDTO.setPin(property.getPin());
        propertyDTO.setSize(property.getSize());
        propertyDTO.setType(property.getType());
        propertyDTO.setBHK(property.getBHK());


        // ---------- Listing ----------
        ListingToken listing = t.getToken();

        ListingForOtherTableResponseDTO listingDTO =
                new ListingForOtherTableResponseDTO();

        listingDTO.setListingPrice(listing.getPrice());
        listingDTO.setListingType(listing.getListingType().name());
        listingDTO.setCity(property.getCity());


        // ---------- Final DTO ----------
        TransactionDecrriptionDTO dto =
                new TransactionDecrriptionDTO();

        dto.setTransactionId(t.getTid());
        dto.setAmount(t.getAmount());
        dto.setDate(t.getTransactionDate());
        dto.setType(t.getType());
        dto.setMode(t.getMode());

        dto.setAgent(agentDTO);
        dto.setBuyer(buyerDTO);
        dto.setSeller(sellerDTO);
        dto.setProperty(propertyDTO);
        dto.setListing(listingDTO);

        return dto;
    }
}
