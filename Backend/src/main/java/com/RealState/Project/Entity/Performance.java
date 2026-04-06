package com.RealState.Project.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int trackId;

    @Column(name = "deals",nullable = false)
    private int total_deals;

    @Column(nullable = false)
    private int totalSales;

    @Column(nullable = false)
    private float score;

    @Column(name="userRating")
    private float user_rating;

    @Column(name="dealsLeft",nullable = false)
    private int deals_left;

    @OneToOne(cascade = CascadeType.ALL,optional = false,orphanRemoval = true)
    @JoinColumn(name = "aid")   // FK column in listing_token
    private Agent agent;
}
