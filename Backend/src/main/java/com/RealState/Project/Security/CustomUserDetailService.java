package com.RealState.Project.Security;

import com.RealState.Project.Entity.Agent;
import com.RealState.Project.Entity.Type.Status;
import com.RealState.Project.Entity.Type.UserType;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Exception.AccessDeniedException;
import com.RealState.Project.Exception.AgentNotFoundException;
import com.RealState.Project.Repository.AgentRepository;
import com.RealState.Project.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository
                .findByUsernameOrEmailAndDeletedFalse(
                        usernameOrEmail,
                        usernameOrEmail
                )
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        if(user.getUserProfile().getUserType() == UserType.AGENT){

            Agent agent = agentRepository.findById(user.getId())
                    .orElseThrow(() ->
                            new AgentNotFoundException("Agent not found"));

            if(agent.getStatus() != Status.ACTIVE){
                throw new AccessDeniedException("Agent not activated by admin");
            }
        }


        return user;
    }
}
