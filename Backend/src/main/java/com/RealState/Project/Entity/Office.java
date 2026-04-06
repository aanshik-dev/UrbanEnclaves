package com.RealState.Project.Entity;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Office {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "office_id")
    @JsonIgnore
    private User user;

    private String officeName;
    private String location;
    private String officeNumber;

    @OneToMany(mappedBy = "office")
    @JsonIgnore
    private List<Agent> agents;

    @OneToMany(mappedBy = "office")
    @JsonIgnore
    private List<Property> properties;
}