package com.RealState.Project.Service;

import com.RealState.Project.Entity.EmailOtp;
import com.RealState.Project.Repository.EmailOtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final EmailOtpRepository emailOtpRepository;
    private final EmailService emailService;

    public void sendOtp(String email) {

        String otp = generateOtp();

        EmailOtp emailOtp = EmailOtp.builder()
                .email(email)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .verified(false)
                .build();

        emailOtpRepository.save(emailOtp);

        emailService.sendOtp(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {

        EmailOtp emailOtp = emailOtpRepository.findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if(emailOtp.isVerified())
            throw new RuntimeException("OTP already verified");

        if(emailOtp.getExpiryTime().isBefore(LocalDateTime.now()))
            throw new RuntimeException("OTP expired");

        if(!emailOtp.getOtp().equals(otp))
            throw new RuntimeException("Invalid OTP");

        emailOtpRepository.delete(emailOtp); // delete after success

        return true;
    }

    private String generateOtp(){
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));
    }

}