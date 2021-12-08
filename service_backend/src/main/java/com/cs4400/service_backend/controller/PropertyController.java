package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.service.RegisterUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

@Api(tags = "Property Controller")
@RestController
public class PropertyController {

    @Autowired
    private RegisterUser registerUser;

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
    public List<Property> properties(@RequestParam(required = false) Integer high,@RequestParam(required = false) Integer low) {
        if (high == null) {
            high = Integer.MAX_VALUE;
        }

        if (low == null) {
            low = 0;
        }
        List<Property> result = propertyProcess.viewProperties(high, low);
        System.out.println(result);
        return result;
    }

    /**
     * view Available properties
     * @param start start date in the filter
     * @param end end date in the filter
     * @return list of available properties.
     */
    @GetMapping(value = "/availableProperties")
    @ApiOperation(value = "available Properties", notes = "available Properties")
    public List<Property> availableProperties(@RequestParam Date start, @RequestParam Date end) {
        List<Property> result = propertyProcess.viewAvailableProperties(start, end);
        System.out.println(result);
        return result;
    }

    /**
     * reserve a property
     * @param propertyName property's name
     * @param ownerEmail owner's email
     * @param customerEmail customer's email
     * @param startDate start date
     * @param endDate end date
     * @param numGuests number of guests
     * @return result
     */
    @GetMapping(value = "/reserveProperty")
    @ApiOperation(value = "reserve Property", notes = "reserve Property")
    public String reserveProperty(@RequestParam String propertyName, @RequestParam String ownerEmail, @RequestParam String customerEmail, @RequestParam Date startDate, @RequestParam Date endDate, @RequestParam Integer numGuests) {
        String result = propertyProcess.reserveProperty(propertyName, ownerEmail, customerEmail, startDate, endDate, numGuests);
        return result;
    }
}

