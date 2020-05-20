package com.example.springparking.service.impl;

import com.example.springparking.entity.Driver;
import com.example.springparking.repository.DriverRepository;
import com.example.springparking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<Driver> getAllDriver(){
        return driverRepository.findAll();
    }

    @Override
    public void creatUser(Driver driver) {
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        driverRepository.saveAndFlush(driver);
    }

    @Override
    public void updateDriver(Long id, Driver driver) {
        Driver clientDb = driverRepository.findById(id).orElse(null);

        if(clientDb != null){
            driver.setId(id);
            driverRepository.save(driver);
            driverRepository.delete(clientDb);

        }
    }

    @Override
    public void deleteDriver(Long id){
        driverRepository.delete(driverRepository.findById(id).get());

    }

    @Override
    public Driver findDriverById(Long id) {
        return driverRepository.findById(id).get();
    }

    @Override
    public Driver findDriverByUsername(String uName) {
        Driver driver = driverRepository.findByUsername(uName);
        if (driver != null){
            throw new RuntimeException("User with this username exists");
        }
        return driver;
    }

    @Override
    public Driver findUser(String uName) {
        Driver driver = driverRepository.findByUsername(uName);
        if (driver == null){
            throw new RuntimeException("User with this username not exists");
        }
        return driver;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Driver driver =  driverRepository.findByUsername(s);
        if (driver == null){
            throw new InternalAuthenticationServiceException("Client " + s + " not found");
        }
        return driver;
    }
}
