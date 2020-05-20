package com.example.springparking.controllers;

import com.example.springparking.entity.Vehicle;
import com.example.springparking.repository.VehicleRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleContr {
    @Autowired
    private VehicleRepository repository;

    @ApiOperation(value = "All Vehicle")
    @GetMapping("")
    public List<Vehicle> books(){
        return repository.findAll();
    }

    @ApiOperation(value = "Add Vehicle")
    @PostMapping("")
    public void addVehicle(@RequestBody Vehicle vehicle){
        Vehicle vehicle1 = repository.findByNomer(vehicle.getNomer());
        if (vehicle1 !=null){
            throw new RuntimeException("Vehicle with this nomer exists");
        }
        repository.save(vehicle);
    }

    @ApiOperation(value = "Find Vehicle by id")
    @GetMapping("/{id}")
    public Vehicle findById(@PathVariable("id") Long id){
        return repository.findById(id).get();
    }

    @ApiOperation(value = "Find Vehicle by driver id")
    @GetMapping("/driver/vehicles/{id}")
    public List<Vehicle> findByDriverId(@PathVariable("id") Long id){
        return repository.findByDriver_Id(id);
    }

    @ApiOperation(value = "Find book by nomer")
    @GetMapping("/find/")
    public Vehicle getByAuthor(@RequestParam String nomer){
        return repository.findByNomer(nomer);
    }

    @ApiOperation(value = "Delete vehicle")
    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id ){
        Vehicle vehicle = repository.findById(id).get();
        repository.delete(vehicle);
    }
}
