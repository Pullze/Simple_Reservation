package com.cs4400.service_backend.controller;


import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Api (tags = "Flight Controller")

@RestController
public class FlightController {


    @Resource
    private FlightProcess flightProcess;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
    }


    /**
     * Schedule a single flight.
     * @param flightInfo flight information.
     * @return Response indicate success or not.
     */
    @PostMapping(value = "/schedule_flight")
    @ApiOperation(value = "schedule flight", notes = "schedule a flight")
    public ResponseEntity<FlightInfo> schedule_flight(@RequestBody @Valid FlightInfo flightInfo) {


        FlightInfo scheduleFlight = flightProcess.schedule_flight(flightInfo);

        if (scheduleFlight.getMessage().equals("schedule succeeded")) {
            return ResponseEntity.status(HttpStatus.OK).body(scheduleFlight);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(scheduleFlight);
        }
    }

    @GetMapping(value =  "/view_flight")
    @ApiOperation(value = "view flight", notes = "view all flights")
    public List<Flight> view_flight(@RequestParam(required = false) Integer minSeats) {
        return  flightProcess.view_flight((minSeats != null)? minSeats : 0);

    }


}
