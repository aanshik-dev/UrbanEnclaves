package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Type.AuthProviderType;
import com.RealState.Project.Entity.Type.UserType;
import com.RealState.Project.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByProviderIdAndProviderType(String providerId, AuthProviderType providerType);

    Optional<User> findByEmail(String email);
    Long countByUserProfileUserType(UserType userType);
    long count();

    Optional<User> findByUsernameAndDeletedFalse(String username);
    Optional<User> findByUsernameOrEmailAndDeletedFalse(
            String username,
            String email
    );
}
