package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Property;

import java.sql.Date;
import java.util.List;

public interface PropertyProcess {

    List<Property> viewProperties(Integer high, Integer low);
    List<Property> viewAvailableProperties(String start, String end);
    String reserveProperty(String propertyEmail, String ownerEmail, String customerEmail, String startDate, String endDate, Integer numGuests);
    

}
