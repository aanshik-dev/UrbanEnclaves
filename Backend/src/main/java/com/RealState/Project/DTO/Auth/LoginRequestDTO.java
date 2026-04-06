package com.RealState.Project.DTO.Auth;

import com.RealState.Project.Entity.Type.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequestDTO {
    String username;
    String password;
    UserType userType;
}
