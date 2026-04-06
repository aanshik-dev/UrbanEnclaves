package com.RealState.Project.Repository;

import com.RealState.Project.DTO.AgentSummaryDTO;
import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.Type.Status;
import com.RealState.Project.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AgentRepository extends JpaRepository<Agent,Long> {
    Optional<Agent> findByUser(User user);
    List<Agent> findByOffice(Office office);

    @Query("""
SELECT new com.RealState.Project.DTO.AgentSummaryDTO(
a.id,
u.username,
p.total_deals,
p.score,
up.phone,
a.status,
p.user_rating
)
FROM Agent a
JOIN a.user u
JOIN u.userProfile up
LEFT JOIN Performance p ON p.agent = a
""")
    List<AgentSummaryDTO> getAllAgentsSummary();

    Long countByOffice(Office office);

    Long countByOfficeAndStatus(Office office, Status status);


    // Optional (pagination - best for large data)
    Page<Agent> findByOffice(Office office, Pageable pageable);

    // Optional (active agents)
    List<Agent> findByOfficeAndStatus(Office office, Status status);

    @Query("""
SELECT a FROM Agent a 
LEFT JOIN ListingToken l 
ON l.agent = a AND l.status = com.RealState.Project.Entity.Type.Status.ACTIVE
WHERE a.office = :office
GROUP BY a
ORDER BY COUNT(l) ASC
""")
    List<Agent> findLeastBusyAgent(Office office);

}
