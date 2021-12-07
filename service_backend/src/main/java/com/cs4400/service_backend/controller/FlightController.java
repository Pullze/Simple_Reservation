package com.cs4400.service_backend.controller;


import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;

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
