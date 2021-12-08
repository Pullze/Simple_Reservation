package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Property;

import java.sql.Date;
import java.util.List;

public interface PropertyProcess {

    List<Property> viewProperties(Integer high, Integer low);
    List<Property> viewAvailableProperties(Date start, Date end);
    String reserveProperty(String propertyEmail, String ownerEmail, String customerEmail, Date startDate, Date endDate, Integer numGuests);
    

}
