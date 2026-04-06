package com.RealState.Project.Entity;

import jakarta.persistence.*;

@Entity
public class E2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true , length = 40)
    String gender;

    int num;

}
