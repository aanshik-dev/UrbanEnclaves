package com.RealState.Project.Strategy;

import com.RealState.Project.Entity.Property;
import com.RealState.Project.Entity.User;

import java.util.List;

public interface PropertyAccessStrategy {

    List<Property> getProperties(User user);

    boolean canAccess(Property property, User user);
}