package com.RealState.Project.Service.Impl;

import com.RealState.Project.DTO.UserProfileResponseDTO;
import com.RealState.Project.Entity.User;
import com.RealState.Project.Entity.UserProfile;
import com.RealState.Project.Repository.UserRepository;
import com.RealState.Project.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    public final UserRepository userRepository;

    @Override
    public void deleteUser(Long userId){

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setDeleted(true);

        userRepository.save(user);
    }

    @Override
    public UserProfileResponseDTO getUserById(Long id){

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        UserProfile profile = user.getUserProfile();

        return UserProfileResponseDTO.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(profile.getName())
                .phone(profile.getPhone())
                .profileUrl(profile.getProfileURL())
                .userType(profile.getUserType().name())
                .isDeleated(user.isDeleted())
                .build();
    }
}
