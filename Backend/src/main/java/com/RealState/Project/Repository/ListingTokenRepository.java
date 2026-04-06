package com.RealState.Project.Repository;

import com.RealState.Project.Entity.*;
import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ListingTokenRepository extends JpaRepository<ListingToken,Long> {

    List<ListingToken> findByPidOfficeId(Long officeId);

    Long countByAgent(Agent agent);

    Long countByAgentAndStatus(Agent agent, Status status);

    Long countByStatus(Status status);


    Long countByPidOffice(Office office);

    Long countByPidOfficeAndStatus(Office office, Status status);

    Long countByPidOfficeAndListingType(Office office, Listing_type type);

    @Query("""
    SELECT COUNT(l)
    FROM ListingToken l
    WHERE l.pid.office = :office
    AND l.listingDate >= :date
    """)
    Long listingsAfter(Office office, LocalDate date);

    List<ListingToken> findByPidOwner(User owner);

    List<ListingToken> findByAgent(Agent agent);

    List<ListingToken> findByPidOffice(Office office);

    @Query("""
SELECT COUNT(l)
FROM ListingToken l
WHERE l.agent = :agent
AND l.status = com.RealState.Project.Entity.Type.Status.ACTIVE
""")
    int countActiveDeals(Agent agent);

    @Query("""
SELECT COUNT(l)
FROM ListingToken l
WHERE l.listingType = com.RealState.Project.Entity.Type.Listing_type.SELL
AND l.status = com.RealState.Project.Entity.Type.Status.INACTIVE
""")
    Long countSoldProperties();

    @Query("""
SELECT COUNT(l)
FROM ListingToken l
WHERE l.listingType = com.RealState.Project.Entity.Type.Listing_type.RENT
AND l.status = com.RealState.Project.Entity.Type.Status.INACTIVE
""")
    Long countRentProperties();


    @Query("""
SELECT COUNT(l)
FROM ListingToken l
WHERE l.listingType = com.RealState.Project.Entity.Type.Listing_type.SELL
AND l.status = com.RealState.Project.Entity.Type.Status.ACTIVE
""")
    Long countSoldListings();

    @Query("""
SELECT COUNT(l)
FROM ListingToken l
WHERE l.listingType = com.RealState.Project.Entity.Type.Listing_type.RENT
AND l.status = com.RealState.Project.Entity.Type.Status.ACTIVE
""")
    Long countRentListings();


}
