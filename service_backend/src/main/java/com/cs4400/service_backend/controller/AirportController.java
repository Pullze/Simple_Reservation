package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.AirportProcess;
import com.cs4400.service_backend.vo.ViewAirportInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "Airport Controller")
@RestController
public class AirportController {

    @Autowired
    private AirportProcess airportProcess;

    /**
     * Get all airports (Admin)
     * @return Response containing all airportInfo.
     */
    @GetMapping(value = "/view_airport")
    @ApiOperation(value = "Get all airports (admin)")
    public Response<?> getAirportInfo() {

        List<ViewAirportInfo> result = airportProcess.getAirportInfo();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

    @GetMapping(value = "/airport/time_zone")
    @ApiOperation(value = "Get timezome of all Airport")
    public Response<?> getTimeZones() {

        List<String> result = airportProcess.getTimeZones();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

}
