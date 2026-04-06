package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PerformanceRepository extends JpaRepository<Performance,Long> {
    Optional<Performance> findByAgent(Agent agent);


}
