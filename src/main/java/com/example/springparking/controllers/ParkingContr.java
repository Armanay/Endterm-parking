package com.example.springparking.controllers;

import com.example.springparking.entity.Parking;
import com.example.springparking.repository.ParkingRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parkings")
public class ParkingContr {
    @Autowired
    private ParkingRepository repository;

    @ApiOperation(value = "All Parking")
    @GetMapping("")
    public List<Parking> parkings(){
        return repository.findAll();
    }

    @ApiOperation(value = "Add Parking")
    @PostMapping("")
    public void addParking(@RequestBody Parking parking){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().isEmpty()){
            throw new RuntimeException("authorize fias;fasl,alsda,sd");
        }
        Parking parking1 = repository.findByName(parking.getName());
        if (parking1 != null){
            throw new RuntimeException("Parking with this name exists");
        }
        repository.save(parking);
    }

    @ApiOperation(value = "Find Parking by id")
    @GetMapping("/{id}")
    public Parking findById(@PathVariable("id") Long id){
        return repository.findById(id).get();
    }

    @ApiOperation(value = "Update book quantity")
    @PatchMapping("/{id}")
    public Parking updateParkingName(@PathVariable Long id, @RequestParam String name){
        Parking parking = repository.findById(id).get();
        parking.setName(name);
        return repository.save(parking);
    }
}
