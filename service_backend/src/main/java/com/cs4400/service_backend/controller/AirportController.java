package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.service.AirportProcess;
import com.cs4400.service_backend.vo.AirportInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "Airport Controller")
@RestController
public class AirportController {

    @Autowired
    private AirportProcess airportProcess;

    @GetMapping(value = "/view_airport")
    @ApiOperation(value = "Get all airports (admin)")
    public List<AirportInfo> getAirportInfo() {

        return airportProcess.getAirportInfo();

    }

}
