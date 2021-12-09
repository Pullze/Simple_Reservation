package com.cs4400.service_backend.controller;


import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import com.cs4400.service_backend.entity.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Api (tags = "Flight Controller")

@RestController
public class FlightController {


    @Autowired
    private FlightProcess flightProcess;


    /**
     * Schedule a single flight.
     * @param flightInfo flight information.
     * @return Response indicate success or not.
     */
    @PostMapping(value = "/schedule_flight")
    @ApiOperation(value = "schedule flight", notes = "schedule a flight")
    public Response<FlightInfo> schedule_flight(@RequestPart("jsonValue") @Valid FlightInfo flightInfo) {

        String message = flightProcess.schedule_flight(flightInfo).getMessage();

        Response<FlightInfo> response = new Response<>();
        response.setData(flightInfo);
        response.setMessage(message);

        if (message.equals("Schedule succeeded!")) {
            response.setCode(200);
        } else {
            response.setCode(400);
        }
        return response;
    }

    @GetMapping(value =  "/view_flight")
    @ApiOperation(value = "view flight", notes = "view all flights")
    public List<Flight> view_flight(@RequestParam(required = false) Integer minSeats) {
        return  flightProcess.view_flight((minSeats != null)? minSeats : 0);

    }




}
