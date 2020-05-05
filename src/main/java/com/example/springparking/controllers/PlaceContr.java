package com.example.springparking.controllers;

import com.example.springparking.entity.Place;
import com.example.springparking.repository.PlaceRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/places")
public class PlaceContr {

    @Autowired
    private PlaceRepository repository;

    @ApiOperation(value = "All Places")
    @GetMapping("")
    public List<Place> places(){
        return repository.findAll();
    }

    @ApiOperation(value = "Add Place")
    @PostMapping("")
    public void addPlace(@RequestBody Place place){
        repository.save(place);
    }

    @ApiOperation(value = "All free places")
    @GetMapping("/free")
    public List<Place> freePlaces(@PathVariable("id") Long id){
        return repository.findByStatusIsFalse();
    }

    @ApiOperation(value = "Delete Place")
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id){
        Place place = repository.findById(id).get();
        repository.delete(place);
    }
}
