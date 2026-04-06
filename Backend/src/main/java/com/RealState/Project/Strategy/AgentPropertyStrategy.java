package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Property;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AgentPropertyStrategy implements PropertyAccessStrategy {

    private final AgentRepository agentRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public List<Property> getProperties(User user){

        Agent agent =
                agentRepository.findByUser(user).orElseThrow();

        return propertyRepository
                .findByOffice(agent.getOffice());
    }

    @Override
    public boolean canAccess(Property property, User user){

        return property
                .getOffice()
                .getUser()
                .getId()
                .equals(user.getId());
    }
}