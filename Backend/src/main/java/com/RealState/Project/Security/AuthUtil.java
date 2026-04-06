package com.RealState.Project.Security;

import com.RealState.Project.Entity.Type.AuthProviderType;
import com.RealState.Project.Entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;

@Component
@Slf4j
public class AuthUtil {

    @Value("${jwt.secretKey}")
    private String jwtSecretKey;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .signWith(getSecretKey())
                .subject(user.getUsername())
                .claim("userId" , user.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*10))
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public AuthProviderType getProviderTypeFromRegistrationId(String registerId) {
        return switch (registerId.toLowerCase()){
            case "google" -> AuthProviderType.GOOGLE;
            case "github" -> AuthProviderType.GITHUB;
            default -> throw new IllegalArgumentException("UnSupported OAuth provider " + registerId );
        };
    }


    public String determineProviderIdFromAuth2User(OAuth2User oAuth2User , String registerId) {
        String providerId = switch (registerId.toLowerCase()) {
            case "google" -> oAuth2User.getAttribute("sub").toString();
            case "github" -> oAuth2User.getAttribute("id").toString();
            default -> {
                log.error("Unsupported OAuth2 : {} ",registerId);
                throw new IllegalArgumentException("UnSupported OAuth provider " + registerId );
            }
        };

        if(providerId == null || providerId.isBlank()){
            log.error("unable to determie providerId for provider : {} ", registerId);
            throw new IllegalArgumentException("Unable to determine providerId for OAuth2 login");
        }

        return providerId;
    }

    public User getCurrentUser(){

        return (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public String determineUsernameFromAuth2User(OAuth2User oAuth2User , String registerId , String providerId){
        String email = oAuth2User.getAttribute("email");
        if (email != null && !email.isBlank())
            return email;
        return switch (registerId.toLowerCase()) {
            case "google" -> oAuth2User.getAttribute("sub").toString();
            case "github" -> oAuth2User.getAttribute("id").toString();
            default -> providerId;
        };
    }


}


