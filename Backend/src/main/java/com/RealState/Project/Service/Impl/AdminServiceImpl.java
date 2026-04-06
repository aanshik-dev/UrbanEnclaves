package com.RealState.Project.Service.Impl;

import com.RealState.Project.DTO.Admin.*;
import com.RealState.Project.DTO.RecentTransactionsDTO;
import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Status;
import com.RealState.Project.Entity.Type.Transactions_types;
import com.RealState.Project.Entity.Type.UserType;
import com.RealState.Project.Exception.AgentNotFoundException;
import com.RealState.Project.Exception.QueryUseOtherThanSelectException;
import com.RealState.Project.Repository.*;
import com.RealState.Project.Service.AdminService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final TransactionRepository transactionRepository;
    private final AgentRepository agentRepository;
    private final EntityManager entityManager;
    private final ListingTokenRepository listingTokenRepository;

    @Override
    public AdminDashboardDTO getDashboard() {

        Pageable pageable = PageRequest.of(0,5);

        List<Transaction> transactions =
                transactionRepository.findRecentTransactions(pageable);

        List<RecentTransactionsDTO> recent =
                transactions.stream()
                        .map(this::convertToRecentDTO)
                        .toList();

        Long soldListings =
                listingTokenRepository.countSoldProperties();

        Long rentListings =
                listingTokenRepository.countRentProperties();

        Long activeInSold = listingTokenRepository.countSoldListings();
        Long activeInRent = listingTokenRepository.countRentListings();


        return AdminDashboardDTO.builder()
                .totalUsers(userRepository.count())
                .totalAgents(userRepository.countByUserProfileUserType(UserType.AGENT))

                .totalProperties(propertyRepository.count())
                .activeListings(listingTokenRepository.countByStatus(Status.ACTIVE))

                .soldListings(soldListings)
                .rentedListings(rentListings)
                .activeInSold(activeInSold)
                .activeInRent(activeInRent)

                .agents(agentRepository.getAllAgentsSummary())
                .recentTransactions(recent)
                .totalRevenue(transactionRepository.totalRevenue())
                .build();
    }

    @Override
    public void activateAgent(Long agentId) {

        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new AgentNotFoundException("Agent not found"));

        agent.setStatus(Status.ACTIVE);

        agentRepository.save(agent);
    }

    @Override
    public void deactivateAgent(Long agentId) {

        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new AgentNotFoundException("Agent not found"));

        agent.setStatus(Status.INACTIVE);

        agentRepository.save(agent);
    }

    @Override
    public RevenueAnalyticsDTO getRevenueAnalytics() {

        LocalDate now = LocalDate.now();

        return RevenueAnalyticsDTO.builder()
                .totalRevenue(transactionRepository.totalRevenue())
                .monthlyRevenue(
                        transactionRepository.revenueAfter(
                                now.minusDays(30)
                        )
                )
                .weeklyRevenue(
                        transactionRepository.revenueAfter(
                                now.minusDays(7)
                        )
                )
                .revenueFromSell(
                        transactionRepository.revenueByListingType(Listing_type.SELL)
                )

                .revenueFromRent(
                        transactionRepository.revenueByListingType(Listing_type.RENT)
                )
                .build();
    }

    @Override
    public TransactionAnalyticsDTO getDealsAnalytics() {

        LocalDate now = LocalDate.now();


        return TransactionAnalyticsDTO.builder()

                .totalTransactions(
                        transactionRepository.totalTransactions()
                )
                .fullPayments(
                        transactionRepository.countByType(
                                Transactions_types.FULL
                        ))
                .advancePayments(
                        transactionRepository.countByType(
                                Transactions_types.ADVANCE
                        ))
                .sellDeals(
                        transactionRepository.countByListingType(
                                Listing_type.SELL
                        ))
                .rentDeals(
                        transactionRepository.countByListingType(
                                Listing_type.RENT
                        ))
                .todayDeals(
                        transactionRepository.dealsAfter(
                                now
                        ))
                .weeklyDeals(
                        transactionRepository.dealsAfter(
                                now.minusDays(7)
                        ))
                .monthlyDeals(
                        transactionRepository.dealsAfter(
                                now.minusDays(30)
                        ))
                .totalAmount(
                        transactionRepository.totalAmount()
                )
                .averageDealAmount(
                        transactionRepository.averageDealAmount()
                )
                .build();
    }

    @Override
    public List<TopAgentDTO> getTopAgents() {

        List<Object[]> data =
                transactionRepository.topAgents(PageRequest.of(0,5));

        return data.stream()
                .map(obj -> new TopAgentDTO(
                        (Long) obj[0],
                        (String) obj[1],
                        (Long) obj[2],
                        (Double) obj[3]
                ))
                .toList();
    }


    @Override
    public QueryResponseDTO runQuery(String sql) {

        try {

            if (sql == null || sql.trim().isEmpty()) {
                throw new IllegalArgumentException("Query cannot be empty");
            }

            String lowerSql = sql.trim().toLowerCase();

            if (!lowerSql.startsWith("select")) {
                throw new QueryUseOtherThanSelectException(
                        "Only SELECT queries allowed"
                );
            }

            Query query = entityManager.createNativeQuery(sql);

            org.hibernate.query.NativeQuery<?> nativeQuery =
                    query.unwrap(org.hibernate.query.NativeQuery.class);

            nativeQuery.setTupleTransformer((tuple, aliases) -> {

                Map<String, Object> result = new LinkedHashMap<>();

                for (int i = 0; i < aliases.length; i++) {
                    result.put(aliases[i], tuple[i]);
                }

                return result;
            });

            List<Map<String, Object>> data =
                    (List<Map<String, Object>>) nativeQuery.getResultList();

            List<String> columns = new ArrayList<>();

            if (!data.isEmpty()) {
                columns.addAll(data.get(0).keySet());
            }

            return QueryResponseDTO.builder()
                    .data(data)
                    .columns(columns)
                    .success(true)
                    .message("Query executed successfully")
                    .build();

        } catch (IllegalArgumentException e) {

            throw e;

        } catch (Exception e) {

            return QueryResponseDTO.builder()
                    .data(Collections.emptyList())
                    .columns(Collections.emptyList())
                    .success(false)
                    .message("Query execution failed: " + e.getMessage())
                    .build();
        }
    }

    private RecentTransactionsDTO convertToRecentDTO(Transaction t){

        return RecentTransactionsDTO.builder()
                .transactionId(t.getTid())
                .amount(t.getAmount())
                .date(t.getTransactionDate())

                .buyerName(
                        t.getBuyer()
                                .getUserProfile()
                                .getName()
                )

                .sellerName(
                        t.getToken()
                                .getPid()
                                .getOwner()
                                .getUserProfile()
                                .getName()
                )

                .propertyCity(
                        t.getToken()
                                .getPid()
                                .getCity()
                )

                .type(t.getType())
                .mode(t.getMode())

                .build();
    }

}


