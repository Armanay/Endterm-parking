package com.example.springparking.controllers;

import com.example.springparking.entity.Driver;
import com.example.springparking.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class DriverContr {

    @Autowired
    private UserService userService;

    @ApiOperation(value = "LIst of all drivers")
    @GetMapping("")
    public List<Driver> driverList(){
        return userService.getAllDriver();
    }

    @ApiOperation(value = "Get driver by ID")
    @GetMapping("/{id}")
    public Driver getById(@PathVariable("id") Long id)
    {
        return userService.findDriverById(id);
    }

    @ApiOperation(value = "Driver registration")
    @PostMapping("")
    public void newDriver(@RequestBody Driver driver){
        userService.findDriverByUsername(driver.getUsername());
        userService.creatUser(driver);
    }


    @ApiOperation(value = "Delete driver by ID")
    @DeleteMapping("/{id}")
    public void removeDriver(@PathVariable Long id){
        userService.deleteDriver(id);
    }
}

