package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.ListingToken;
import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.ListingTokenRepository;
import com.RealState.Project.Repository.OfficeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OfficeListingStrategy implements ListingAccessStrategy {

    private final OfficeRepository officeRepository;
    private final ListingTokenRepository listingRepository;

    @Override
    public List<ListingToken> getListings(User user){

        Office office =
                officeRepository.findByUser(user).orElseThrow();

        return listingRepository.findByPidOffice(office);
    }

    @Override
    public boolean canAccess(ListingToken listing, User user){

        return listing
                .getPid()
                .getOffice()
                .getUser()
                .getId()
                .equals(user.getId());
    }
}