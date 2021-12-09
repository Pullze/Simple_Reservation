package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Airline;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.AirlineProcess;
import com.cs4400.service_backend.vo.AirlineInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "Airline Controller")
@RestController
public class AirlineController {

    @Autowired
    private AirlineProcess airlineProcess;

    /**
     * Get all airlines.
     * @return A list of all airlines.
     */
    @GetMapping("/airlines")
    @ApiOperation(value = "Get all airlines")
    public Response<?> getAirlines() {

        List<Airline> result = airlineProcess.getAllAirline();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

    /**
     * Get all airlines. (Admin)
     * @return a list of all AirlineInfo.
     */
    @GetMapping("/view_airline")
    @ApiOperation(value = "Get all airlines (admin)")
    public Response<?> getAirlineInfo() {

        List<AirlineInfo> result = airlineProcess.getAirlineInfo();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

}
