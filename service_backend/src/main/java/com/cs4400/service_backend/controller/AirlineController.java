package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Airline;
import com.cs4400.service_backend.service.AirlineProcess;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "Airline Controller")
@RestController
public class AirlineController {

    @Autowired
    private AirlineProcess airlineProcess;

    @GetMapping("/airlines")
    @ApiOperation(value = "Get all airlines")
    public List<Airline> getAirlines() {

        return airlineProcess.getAllAirline();

    }

}
