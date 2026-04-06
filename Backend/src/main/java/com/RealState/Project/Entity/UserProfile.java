package com.RealState.Project.Entity;

import com.RealState.Project.Entity.Type.UserType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(length = 50,nullable = false)
    private String name;


    @Column(length = 10,nullable = false)
    private long phone;


    private String profileURL;


    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private int pin;

    @CreationTimestamp
    private LocalDate regDate;

    @Enumerated(EnumType.STRING)
    private UserType userType;
}