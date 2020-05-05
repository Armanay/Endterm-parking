package com.example.springparking.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Parking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String address;

    @OneToMany(mappedBy = "parking", fetch = FetchType.LAZY)
    private List<Place> places;


}
