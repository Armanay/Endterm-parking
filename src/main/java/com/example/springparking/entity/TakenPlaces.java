package com.example.springparking.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class TakenPlaces {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicleId")
    private Vehicle vehicle;


}
