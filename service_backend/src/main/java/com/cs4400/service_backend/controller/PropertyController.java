package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.service.UserProcess;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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



}

