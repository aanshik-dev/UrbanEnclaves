package com.RealState.Project.Utils;

import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Office;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Exception.AgentNotFoundException;
import com.RealState.Project.Exception.OfficeNotFoundException;
import com.RealState.Project.Exception.UserNotFoundException;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.OfficeRepository;
import com.RealState.Project.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final UserRepository userRepository;
    private final OfficeRepository officeRepository;
    private  final AgentRepository agentRepository;

    public User getCurrentUser(){

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public Office getCurrentOffice(){

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow();

        return officeRepository
                .findById(user.getId())
                .orElseThrow(() -> new OfficeNotFoundException("Office not found"));
    }

    private Agent getCurrentAgent(){

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return agentRepository.findByUser(user)
                .orElseThrow(() -> new AgentNotFoundException("Agent not found"));
    }
}