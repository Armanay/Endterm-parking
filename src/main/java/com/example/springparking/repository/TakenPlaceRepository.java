package com.example.springparking.repository;

import com.example.springparking.entity.TakenPlaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TakenPlaceRepository extends JpaRepository<TakenPlaces,Long> {
}
