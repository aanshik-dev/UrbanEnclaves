package com.RealState.Project.Service.Impl;

import com.RealState.Project.DTO.*;
import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Status;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.*;
import com.RealState.Project.Service.OfficeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfficeServiceImpl implements OfficeService {
    private final OfficeRepository officeRepository;
    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    private final PropertyRepository propertyRepository;
    private final ListingTokenRepository listingRepository;
    private final TransactionRepository transactionRepository;


    private Office getCurrentOffice(){

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow();

        return officeRepository
                .findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Office not found"));
    }


    @Override
    public OfficeDashboardDTO getDashboard() {

        Office office = getCurrentOffice();

        LocalDate now = LocalDate.now();

        Long agents =
                agentRepository.countByOffice(office);

        Long activeAgents =
                agentRepository.countByOfficeAndStatus(
                        office,
                        Status.ACTIVE
                );

        Long properties =
                propertyRepository.countByOffice(office);

        Long listings =
                listingRepository.countByPidOffice(office);

        Long activeListings =
                listingRepository
                        .countByPidOfficeAndStatus(
                                office,Status.ACTIVE
                        );

        Long soldListings =
                listingRepository
                        .countByPidOfficeAndStatus(
                                office,
                                Status.INACTIVE
                        );

        Long sellListings =
                listingRepository
                        .countByPidOfficeAndListingType(
                                office,
                                Listing_type.SELL
                        );

        Long rentListings =
                listingRepository
                        .countByPidOfficeAndListingType(
                                office,
                                Listing_type.RENT
                        );

        Long totalDeals =
                transactionRepository
                        .totalDeals(office);

        Double totalRevenue =
                transactionRepository
                        .totalRevenue(office);

        Double monthlyRevenue =
                transactionRepository
                        .monthlyRevenue(
                                office,
                                now.minusDays(30)
                        );

        return OfficeDashboardDTO.builder()
                .totalAgents(agents)
                .activeAgents(activeAgents)
                .totalProperties(properties)
                .totalListings(listings)
                .activeListings(activeListings)
                .soldListings(soldListings)
                .sellListings(sellListings)
                .rentListings(rentListings)
                .totalDeals(totalDeals)
                .totalRevenue(totalRevenue)
                .monthlyRevenue(monthlyRevenue)
                .build();
    }


    @Override
    public List<AgentSummaryDTO> getAgents() {

        Office office = getCurrentOffice();

        return agentRepository
                .findByOffice(office)
                .stream()
                .map(agent -> AgentSummaryDTO.builder()
                        .agentId(agent.getId())
                        .username(agent.getUser().getUsername())
                        .phone(agent.getUser().getUserProfile().getPhone())
                        .status(agent.getStatus())
                        .rating(0.0f) // temporary until rating implemented
                        .build())
                .collect(Collectors.toList());
    }


    @Override
    public List<PropertyDTO> getProperties() {

        Office office = getCurrentOffice();

        return propertyRepository
                .findByOffice(office)
                .stream()
                .map(p -> PropertyDTO.builder()
                        .city(p.getCity())
                        .locality(p.getLocality())
                        .id(p.getId())
                        .build())
                .collect(Collectors.toList());
    }


    @Override
    public List<ListingDTO> getListings() {

        Office office = getCurrentOffice();

        return listingRepository
                .findByPidOfficeId(office.getId())
                .stream()
                .map(l -> ListingDTO.builder()
                        .id(l.getToken_id())
                        .price(l.getPrice())
                        .status(l.getStatus())
                        .build())
                .collect(Collectors.toList());
    }
}


