package com.example.springparking.service;

import com.example.springparking.entity.Driver;

import java.util.List;

public interface UserService {

    List<Driver> getAllDriver();
    void creatUser(Driver user);
    void updateDriver(Long id, Driver driver);
    void deleteDriver(Long id);
    Driver findDriverById(Long id);
    Driver findDriverByUsername(String uName);
}
