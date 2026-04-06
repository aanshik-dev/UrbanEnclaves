package com.RealState.Project.DTO;

import lombok.Builder;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDTO {

    private Long userId;
    private String username;
    private String email;

    private String name;
    private long phone;
    private String profileUrl;
    private boolean isDeleated;

    private String userType;
}
