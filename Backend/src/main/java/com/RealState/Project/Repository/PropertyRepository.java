package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.Property;
import com.RealState.Project.Entity.Type.Status;
import com.RealState.Project.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property,Long> {
    List<Property> findByOffice(Office office);

    Long countByOffice(Office office);

    List<Property> findByOwner(User owner);


}
