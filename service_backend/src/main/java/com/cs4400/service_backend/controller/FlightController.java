package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
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



    @PostMapping(value = "/schedule_flight")
    @ApiOperation(value = "schedule flight", notes = "schedule flight")
    public ResponseEntity<FlightInfo> schedule_flight( FlightInfo flightInfo) {


        FlightInfo scheduleFlight = flightProcess.schedule_flight(flightInfo);

        if (scheduleFlight.getMessage().equals("schedule succeeded")) {
            return ResponseEntity.status(HttpStatus.OK).body(scheduleFlight);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(scheduleFlight);
        }
    }



}
