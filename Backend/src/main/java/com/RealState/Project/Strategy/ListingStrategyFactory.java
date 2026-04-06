package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Type.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ListingStrategyFactory {

    private final UserListingStrategy user;
    private final AgentListingStrategy agent;
    private final OfficeListingStrategy office;
    private final AdminListingStrategy admin;

    public ListingAccessStrategy getStrategy(UserType type){

        return switch (type){

            case USER -> user;
            case AGENT -> agent;
            case OFFICE -> office;
            case ADMIN -> admin;
        };
    }
}