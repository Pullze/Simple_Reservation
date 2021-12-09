package com.cs4400.service_backend.controller;


import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import com.cs4400.service_backend.vo.ViewFlightInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    /**
     * Get all flights.
     * @param minSeats Minimum avaliable seats.
     * @return Response contain all flights.
     */
    @GetMapping(value =  "/flights")
    @ApiOperation(value = "Get all flights", notes = "get all flights")
    public Response<?> getFlights(@RequestParam(required = false) Integer minSeats) {

        List<Flight> result = flightProcess.view_flight((minSeats != null)? minSeats : 0);
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

    /**
     * Admin view all flights.
     * @return Response contain all flightInfo for admin.
     */
    @GetMapping(value = "/view_flight")
    @ApiOperation(value = "Get all flights (Admin)")
    public Response<?> getFlightInfo() {

        List<ViewFlightInfo> result = flightProcess.getFlightInfo();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

}
