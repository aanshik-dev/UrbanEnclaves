package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.Property;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.OfficeRepository;
import com.RealState.Project.Repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OfficePropertyStrategy implements PropertyAccessStrategy {

    private final OfficeRepository officeRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public List<Property> getProperties(User user){

        Office office =
                officeRepository.findByUser(user).orElseThrow();

        return propertyRepository.findByOffice(office);
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
