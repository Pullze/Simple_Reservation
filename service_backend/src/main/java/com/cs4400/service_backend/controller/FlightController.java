package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.sql.Date;
import java.sql.Time;

@Api (tags = "Flight Controller")

@RestController
public class FlightController {

    @Autowired
    private FlightProcess flightProcess;

    @PostMapping(value = "/schedule_flight")
    @ApiOperation(value = "schedule flight", notes = "schedule flight")
    public ResponseEntity<FlightInfo> schedule_flight(@Valid FlightInfo flightInfo) {


        FlightInfo scheduleFlight = flightProcess.schedule_flight(flightInfo);

        if (scheduleFlight.getMessage().equals("schedule succeeded")) {
            return ResponseEntity.status(HttpStatus.OK).body(scheduleFlight);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(scheduleFlight);
        }
    }


}
