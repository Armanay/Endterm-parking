package com.example.springparking.entity;

import lombok.Data;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "takenVehicleId")
    private TakenPlaces takenPlaces;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driverId")
    private Driver driver;

}
