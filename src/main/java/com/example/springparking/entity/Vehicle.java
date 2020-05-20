package com.example.springparking.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Data
@Entity
public class Vehicle  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String model;
    @Column(unique = true)
    private String nomer;


    @OneToOne(mappedBy = "vehicle", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Getter(AccessLevel.NONE)
    private TakenPlaces takenPlaces;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driverId")
    @Getter(AccessLevel.NONE)
    private Driver driver;

}
