package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.service.UserProcess;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.List;

@Api(tags = "Property Controller")
@RestController
public class PropertyController {

    @Autowired
    private UserProcess userProcess;

    @Autowired
    private Login login;

    @Autowired
    private PropertyProcess propertyProcess;

    /**
     * Get all properties.
     * @param high higher bound of capacity.
     * @param low lower bound of capacity.
     * @return a list of property as require.
     */
    @GetMapping(value = "/properties")
    @ApiOperation(value = "view Properties", notes = "view properties.")
    public Response<?> properties(@RequestParam(required = false) Integer high,@RequestParam(required = false) Integer low) {
        if (high == null) {
            high = Integer.MAX_VALUE;
        }

        if (low == null) {
            low = 0;
        }
        List<Property> result = propertyProcess.viewProperties(high, low);
        System.out.println(result);

        Response<?> response = new Response<>(HttpStatus.OK.value(), "", result);
        return response;
    }

    /**
     * view Available properties
     * @param start start date in the filter
     * @param end end date in the filter
     * @return list of available properties.
     */
    @GetMapping(value = "/available-properties")
    @ApiOperation(value = "available Properties", notes = "available Properties")
    public List<Property> availableProperties(@RequestParam String start, @RequestParam String end) {
        List<Property> result = propertyProcess.viewAvailableProperties(start, end);
        System.out.println(result);
        return result;
    }

    /**
     * reserve a property
     * @param reserve reservation object
     * @return result
     */
    @PostMapping(value = "/reserve-property")
    @ApiOperation(value = "reserve Property", notes = "reserve Property")
    public Response<Reserve> reserveProperty(@RequestPart("jsonValue") @Valid Reserve reserve) {
        String message = propertyProcess.reserveProperty(reserve);
        Response<Reserve> response = new Response<>();
        response.setData(reserve);
        response.setMessage(message);
        if (message.equals("Reserved succeeded!")) {
            response.setCode(HttpStatus.OK.value());
        } else {
            response.setCode(HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }
}

