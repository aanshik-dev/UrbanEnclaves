package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Images;
import com.RealState.Project.Entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface ImagesRepository  extends JpaRepository<Images,Long> {
    List<Images> findByPropertyId(Property propertyId);
    void deleteByPropertyId(Property propertyId);
}
