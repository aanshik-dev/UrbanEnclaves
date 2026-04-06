package com.RealState.Project.Entity;

import com.RealState.Project.Entity.Type.Listing_type;
import com.RealState.Project.Entity.Type.Status;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListingToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int token_id;

    @CreationTimestamp
    private LocalDate listingDate;

    @Column(name="listType",nullable = false)
    @Enumerated(EnumType.STRING)
    private Listing_type listingType;

    @Column(nullable = false)
    private float price;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name="pid")
    @JsonIgnore
    private Property pid;

    @ManyToOne(optional = true)
    @JoinColumn(name = "aid")
    @JsonIgnore
    private Agent agent;
}
