package com.RealState.Project.Repository;


import com.RealState.Project.Entity.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {

    Optional<EmailOtp> findByEmail(String email);
    Optional<EmailOtp> findTopByEmailOrderByExpiryTimeDesc(String email);

}