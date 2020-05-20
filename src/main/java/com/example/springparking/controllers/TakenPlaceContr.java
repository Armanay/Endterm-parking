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
import java.util.List;

@RestController
@RequestMapping("/takenPlaces")
public class TakenPlaceContr {

    @Autowired
    private TakenPlaceRepository takenPlaceRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @ApiOperation(value = "All taken places")
    @GetMapping("")
    public List<TakenPlaces> takePlace() {
       return takenPlaceRepository.findAll();
    }


    @ApiOperation(value = "Take place")
    @PostMapping("/{vehicleId}/{placeId}")
    public TakenPlaces takePlace(@PathVariable("vehicleId") Long vehicleId, @PathVariable("placeId") Long placeId){
        Date date = new Date();
        Place place = placeRepository.findById(placeId).get();
        Vehicle vehicle = vehicleRepository.findById(vehicleId).get();
        if(place.isStatus()){
            if (place != null){
                if (vehicle != null){
                    TakenPlaces takenPlaces = new TakenPlaces();
                    takenPlaces.setDate(date);
                    takenPlaces.setPlace(place);
                    takenPlaces.setVehicle(vehicle);
                    place.setStatus(false);
                    placeRepository.save(place);
                    takenPlaceRepository.save(takenPlaces);
                    return takenPlaces;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
         return null;
        }
    }

    @ApiOperation(value = "Leave Place")
    @DeleteMapping("/{id}")
    public String leavePlace(@PathVariable Long id) {
//        Place place = placeRepository.findById(placeId).get();
//        Vehicle vehicle = vehicleRepository.findById(vehicleId).get();
      TakenPlaces takenPlaces = takenPlaceRepository.findById(id).get();
      if (takenPlaces != null){
          takenPlaceRepository.delete(takenPlaces);
          return "urrrrra";
      }
      else {
          return "neu takogo";
      }
    }
}
