package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.Transaction;
import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Transactions_types;
import com.RealState.Project.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findByBuyer(User user);

    List<Transaction> findByAgent(Agent agent);

    Long countByAgent(Agent agent);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.agent = :agent")
    Double getTotalRevenue(Agent agent);

    @Query("SELECT SUM(t.amount) FROM Transaction t")
    Double totalRevenue();


    @Query("""
    SELECT SUM(t.amount)
    FROM Transaction t 
    WHERE t.transactionDate >= :date
    """)
    Double revenueAfter(LocalDate date);


    @Query("SELECT COUNT(t) FROM Transaction t")
    Long totalTransactions();


    Long countByType(Transactions_types type);


    // sell deals
    @Query("""
            SELECT COUNT(t)
            FROM Transaction t
            JOIN t.token lt
            WHERE lt.listingType = :type
            """)
    Long countByListingType(Listing_type type);


    // deals after date
    @Query("""
            SELECT COUNT(t)
            FROM Transaction t
            WHERE t.transactionDate >= :date
            """)
    Long dealsAfter(LocalDate date);


    // total amount
    @Query("""
            SELECT COALESCE(SUM(t.amount),0)
            FROM Transaction t
            """)
    Double totalAmount();


    // average deal amount
    @Query("""
            SELECT COALESCE(AVG(t.amount),0)
            FROM Transaction t
            """)
    Double averageDealAmount();


    @Query("""
    SELECT t.agent.id ,
           t.agent.user.userProfile.name ,
           COUNT(t),
           COALESCE(SUM(t.amount),0)
    FROM Transaction t
    GROUP BY t.agent.id , t.agent.user.userProfile.name
    ORDER BY SUM(t.amount) DESC
    """)
    List<Object[]> topAgents(Pageable pageable);

    @Query("""
           SELECT COALESCE(SUM(t.amount),0)
           FROM Transaction t
           JOIN t.token lt
           WHERE lt.listingType = :type
           """)
    Double revenueByListingType(Listing_type type);

    @Query("""
    SELECT COUNT(t)
    FROM Transaction t
    WHERE t.agent.office = :office
    """)
    Long totalDeals(Office office);


    @Query("""
    SELECT COALESCE(SUM(t.amount),0)
    FROM Transaction t
    WHERE t.agent.office = :office
    """)
    Double totalRevenue(Office office);


    @Query("""
    SELECT COALESCE(SUM(t.amount),0)
    FROM Transaction t
    WHERE t.agent.office = :office
    AND t.transactionDate >= :date
    """)
    Double monthlyRevenue(Office office, LocalDate date);

    @Query("""
    SELECT COUNT(t)
    FROM Transaction t
    WHERE t.agent = :agent
    AND t.transactionDate >= :date
    """)
    Long dealsAfter(Agent agent, LocalDate date);


    @Query("""
    SELECT COALESCE(SUM(t.amount),0)
    FROM Transaction t
    WHERE t.agent = :agent
    AND t.transactionDate >= :date
    """)
    Double revenueAfter(Agent agent, LocalDate date);

    List<Transaction> findByAgentOffice(Office office);


    @Query("""
    SELECT t
    FROM Transaction t
    JOIN FETCH t.agent a
    JOIN FETCH a.user u
    JOIN FETCH u.userProfile
    JOIN FETCH t.buyer b
    JOIN FETCH b.userProfile
    JOIN FETCH t.token lt
    JOIN FETCH lt.pid p
    JOIN FETCH p.owner
    """)
    List<Transaction> findAllWithDetails();


    @Query("""
    SELECT t
    FROM Transaction t
    JOIN FETCH t.agent a
    JOIN FETCH a.user au
JOIN FETCH au.userProfile
JOIN FETCH t.buyer b
JOIN FETCH b.userProfile
JOIN FETCH t.token lt
JOIN FETCH lt.pid p
JOIN FETCH p.owner o
JOIN FETCH o.userProfile
WHERE t.buyer = :user
""")
    List<Transaction> findByBuyerWithDetails(User user);

    @Query("""
SELECT t
FROM Transaction t
JOIN FETCH t.agent a
JOIN FETCH a.user au
JOIN FETCH au.userProfile
JOIN FETCH t.buyer b
JOIN FETCH b.userProfile
JOIN FETCH t.token lt
JOIN FETCH lt.pid p
JOIN FETCH p.owner o
JOIN FETCH o.userProfile
WHERE p.owner = :user
""")
    List<Transaction> findBySellerWithDetails(User user);


    @Query("""
SELECT t FROM Transaction t
ORDER BY t.transactionDate DESC
""")
    List<Transaction> findRecentTransactions(Pageable pageable);
}


