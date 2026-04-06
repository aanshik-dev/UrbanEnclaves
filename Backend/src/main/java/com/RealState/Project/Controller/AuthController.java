package com.RealState.Project.Controller;

import com.RealState.Project.DTO.Auth.*;
import com.RealState.Project.Security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpDTO dto){
        authService.sendSignupOtp(dto.getEmail());
        return ResponseEntity.ok("OTP Sent");
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDTO> register(@RequestBody SignupRequestDTO dto){
        return ResponseEntity.ok(authService.signup(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(@RequestBody RefreshTokenRequestDTO dto){

        return ResponseEntity.ok(
                authService.refreshToken(dto)
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgetPasswordDTO dto){

        authService.forgotPassword(dto);
        return ResponseEntity.ok("OTP sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordDTO dto){

        authService.resetPassword(dto);
        return ResponseEntity.ok("Password updated");
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordDTO dto){

        authService.changePassword(dto);
        return ResponseEntity.ok("Password changed");
    }
}
