package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.ListingToken;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.ListingTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AdminListingStrategy implements ListingAccessStrategy {

    private final ListingTokenRepository listingRepository;

    @Override
    public List<ListingToken> getListings(User user){

        return listingRepository.findAll();
    }

    @Override
    public boolean canAccess(ListingToken listing, User user){

        return true;
    }
}