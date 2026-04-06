package com.RealState.Project.Security;

import com.RealState.Project.Entity.RefreshToken;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken createOrUpdateRefreshToken(User user){

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByUser(user)
                        .orElse(null);

        if(refreshToken == null){
            refreshToken = new RefreshToken();
            refreshToken.setUser(user);
        }

        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(LocalDateTime.now().plusDays(7));

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyRefreshToken(String token){

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid Refresh Token"));

        if(refreshToken.getExpiryDate().isBefore(LocalDateTime.now()))
            throw new RuntimeException("Refresh Token Expired");

        return refreshToken;
    }
}
