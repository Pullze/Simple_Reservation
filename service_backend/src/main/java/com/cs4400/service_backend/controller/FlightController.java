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

import java.sql.Date;
import java.sql.Time;

@Api (tags = "Flight Controller")

@RestController
public class FlightController {

    @Autowired
    private FlightProcess flightProcess;

    @PostMapping(value = "/schedule_flight")
    @ApiOperation(value = "schedule flight", notes = "schedule flight")
    public ResponseEntity<FlightInfo> schedule_flight(@RequestParam String flight_num,
                                                      @RequestParam String airline_name,
                                                      @RequestParam String from_airport,
                                                      @RequestParam String  to_airport,
                             @JsonFormat(pattern = "HH:mm:ss") @RequestParam Time departure_time,
                             @JsonFormat(pattern = "HH:mm:ss") @RequestParam Time arrival_time,
                                                      @RequestParam Date flight_date,
                                                      @RequestParam double cost,
                                                      @RequestParam int capacity,
                                                      @RequestParam Date current_date) {

        String message = flightProcess.schedule_flight(flight_num, airline_name, from_airport, to_airport,
                departure_time, arrival_time, flight_date, cost, capacity, current_date);

        if (message.equals("schedule succeeded")) {
            Flight flight = flightProcess.check_flight(flight_num, airline_name);
            return ResponseEntity.status(HttpStatus.OK).body(new FlightInfo(flight, message));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new FlightInfo(null, message));
        }
    }


}
