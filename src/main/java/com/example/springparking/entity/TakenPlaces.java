package com.example.springparking.entity;

import lombok.Data;

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
    @OneToOne(mappedBy = "takenPlaces", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Place place;

    @OneToOne(mappedBy = "takenPlaces", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Vehicle vehicle;


}
