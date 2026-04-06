package com.RealState.Project.Entity;
import com.RealState.Project.Entity.Type.Property_type;

import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 10)
    private String houseNo;

    private String description;

    @Column(nullable = false)
    private String locality;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false,length = 10)
    private int pin;

    @Column(nullable = false)
    private float size;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Property_type type;

    @Column(nullable = false)
    private int BHK;

    @Column(length=4)
    private int year_built;

    @ManyToOne(cascade = CascadeType.PERSIST,optional = false)
    @JoinColumn(name="ownerId")
    @JsonIgnore
    private User owner;

    @ManyToOne(cascade = CascadeType.PERSIST,optional = false)
    @JoinColumn(name = "officeId")
    private Office office;
}
