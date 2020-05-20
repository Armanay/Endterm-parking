package com.example.springparking.repository;

import com.example.springparking.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
    Vehicle findByNomer(String nomer);

    List<Vehicle> findByDriver_Id(Long id);
}
