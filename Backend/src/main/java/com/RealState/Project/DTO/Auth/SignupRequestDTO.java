package com.RealState.Project.DTO.Auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class SignupRequestDTO {

    private String username;
    private String password;
    private String email;
    private String otp;
}
