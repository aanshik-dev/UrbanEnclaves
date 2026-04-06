package com.RealState.Project.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtp(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@realstate.com");
        message.setTo(email);
        message.setSubject("Email Verification OTP");
        message.setText("Your OTP is : " + otp);

        mailSender.send(message);
    }
}