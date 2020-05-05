package com.example.springparking.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parkingId")
    private Parking parking;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "takenPlaceId")
    private TakenPlaces takenPlaces;
}
