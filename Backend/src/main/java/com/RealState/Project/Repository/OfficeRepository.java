package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OfficeRepository extends JpaRepository<Office,Long> {

    Optional<Office> findByUser(User user);

}
