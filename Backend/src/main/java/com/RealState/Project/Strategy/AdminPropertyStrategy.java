package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Property;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AdminPropertyStrategy implements PropertyAccessStrategy {

    private final PropertyRepository propertyRepository;

    @Override
    public List<Property> getProperties(User user){

        return propertyRepository.findAll();
    }

    @Override
    public boolean canAccess(Property property, User user){

        return true;
    }
}