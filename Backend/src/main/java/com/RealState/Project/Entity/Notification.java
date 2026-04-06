package com.RealState.Project.Entity;
import com.RealState.Project.Entity.Type.Notification_type;
import com.RealState.Project.Entity.Type.Notification_status;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nid;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Notification_type type;  // User or Agent discuss type and then use enums

    @CreationTimestamp
    private LocalDate date;

    @CreationTimestamp
    private LocalTime time;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Notification_status status;

    @ManyToOne(optional = false,cascade = CascadeType.PERSIST)
    @JoinColumn(name="senderId")
    private User sid;

    @ManyToOne(optional = false,cascade = CascadeType.PERSIST)
    @JoinColumn(name="receiverId")
    private User rid;
}
