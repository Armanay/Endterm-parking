package com.example.springparking.controllers;

import com.example.springparking.entity.Place;
import com.example.springparking.entity.TakenPlaces;
import com.example.springparking.entity.Vehicle;
import com.example.springparking.repository.PlaceRepository;
import com.example.springparking.repository.TakenPlaceRepository;
import com.example.springparking.repository.VehicleRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Date;

@RestController
@RequestMapping("/takenPlaces")
public class TakenPlaceContr {

    @Autowired
    private TakenPlaceRepository takenPlaceRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @ApiOperation(value = "Take place")
    @PostMapping("/{vehicleId}/{placeId}")
    public String takePlace(@PathVariable("vehicleId") Long vehicleId, @PathVariable("placeId") Long placeId){
        Date date = new Date();
        Place place = placeRepository.findById(placeId).get();
        Vehicle vehicle = vehicleRepository.findById(vehicleId).get();
        if(place.isStatus()){
            TakenPlaces takenPlaces = new TakenPlaces();
            takenPlaces.setDate(date);
            takenPlaces.setPlace(place);
            takenPlaces.setVehicle(vehicle);
            place.setStatus(false);
            placeRepository.save(place);
            return "Success";
        }
        else {
         return "This place is not free!";
        }
    }

    @ApiOperation(value = "Leave Place")
    @DeleteMapping("/{vehicleId}/{placeId}")
    public String leavePlace(@PathVariable("vehicleId") Long vehicleId, @PathVariable("placeId") Long placeId){
        Place place = placeRepository.findById(placeId).get();
        Vehicle vehicle = vehicleRepository.findById(vehicleId).get();
        if (vehicle.getTakenPlaces() != null){
            if (vehicle.getTakenPlaces().getPlace() == place){
                 for (TakenPlaces takenPlaces :takenPlaceRepository.findAll()){
                     if (takenPlaces.getPlace().getId().equals(placeId) && takenPlaces.getVehicle().getId().equals(vehicleId)){
                         takenPlaceRepository.delete(takenPlaces);
                         return vehicle.toString() + " leaves this place " + place.toString();
                     }
                 }
            }
            else {
                return "Vehicle did not take this place " + place.toString();
            }
        }else {
            return "Vehicle has not any taken place!";
        }
        return "Error";
    }
}
