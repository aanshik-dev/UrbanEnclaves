package com.RealState.Project.Security;
import jakarta.servlet.Filter;
import jakarta.validation.MessageInterpolator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.net.ContentHandler;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebConfig {

    private final AuthFilter authFilter;
    private final OAuthSuccessHandler oAuthSuccessHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {
        httpSecurity
                .csrf(csrfConfig->csrfConfig.disable())
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .exceptionHandling(ex -> ex

                        // 401 — Authentication required
                        .authenticationEntryPoint((request, response, authException) -> {

                            response.setStatus(401);
                            response.setContentType("application/json");

                            response.getWriter().write("""
                        {
                          "status":401,
                          "message":"Authentication Required"
                        }
                        """);
                        })

                        // 403 — Access denied
                        .accessDeniedHandler((request, response, accessDeniedException) -> {

                            response.setStatus(403);
                            response.setContentType("application/json");

                            response.getWriter().write("""
                        {
                          "status":403,
                          "message":"Access Denied"
                        }
                        """);
                        })
                )


                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/public/**","/auth/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/agent/**").hasRole("AGENT")
                        .requestMatchers("/user/**").hasRole("USER")
                        .anyRequest().authenticated()
                )

                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oAuth->oAuth.failureHandler(
                        (request, response, exception) ->{
                            log.error("Oauth2 error :{}",exception.getMessage());
                        }
                ).successHandler(oAuthSuccessHandler));
//               .formLogin(Customizer.withDefaults());
        return httpSecurity.build();
    }


}
