package com.RealState.Project.Service;

import com.RealState.Project.DTO.UserProfileResponseDTO;
import com.RealState.Project.Entity.User;
import org.jspecify.annotations.Nullable;

public interface UserService {
    public void deleteUser(Long userId);

    UserProfileResponseDTO getUserById(Long id);
}
