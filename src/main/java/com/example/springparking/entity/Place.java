package com.example.springparking.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

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
    @Getter(AccessLevel.NONE)
    private Parking parking;

    @OneToOne(mappedBy = "place", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Getter(AccessLevel.NONE)
    private TakenPlaces takenPlaces;
}
